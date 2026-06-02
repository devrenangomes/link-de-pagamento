require('dotenv').config();
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { criarCobranca, getQRCode, consultarCobranca } = require('./services/efibank');
const { salvarVenda, listarVendas, atualizarStatus } = require('./services/csv');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Armazena dados de pagamento em memória enquanto aguarda confirmação
const pedidos = new Map();

const PRECOS = { mesa: 130.00, individual: 40.00 };
const DESCRICAO = { mesa: 'Mesa (4 lugares)', individual: 'Individual' };

// ─── CHECKOUT ─────────────────────────────────────────────────────────────────

app.post('/checkout', async (req, res) => {
  const { nome, cpf, email, telefone, tipo, quantidade } = req.body;

  if (!nome || !cpf || !email || !telefone || !tipo || !quantidade) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  const preco = PRECOS[tipo];
  if (!preco) return res.status(400).send('Tipo de ingresso inválido.');

  const qtd = Math.max(1, parseInt(quantidade) || 1);
  const total = preco * qtd;
  const cpfLimpo = cpf.replace(/\D/g, '');

  try {
    const cobranca = await criarCobranca({
      nome,
      cpf: cpfLimpo,
      valor: total,
      descricao: `Ingresso ${DESCRICAO[tipo]} x${qtd} — ${process.env.EVENTO_NOME || 'Evento'}`,
    });

    const qrcode = await getQRCode(cobranca.loc.id);

    const venda = {
      id: cobranca.txid,
      data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      nome,
      cpf,
      email,
      telefone,
      tipo,
      quantidade: qtd,
      total: total.toFixed(2),
      status: 'PENDENTE',
      txid: cobranca.txid,
    };

    await salvarVenda(venda);

    pedidos.set(cobranca.txid, {
      nome,
      tipo,
      descricao: DESCRICAO[tipo],
      quantidade: qtd,
      total: total.toFixed(2),
      qrcode: qrcode.qrcode,
      imagem: qrcode.imagemQrcode,
      expiracao: cobranca.calendario.expiracao,
    });

    res.redirect(`/pagamento.html?txid=${cobranca.txid}`);
  } catch (err) {
    const detalhe = err.response?.data;
    console.error('[CHECKOUT ERROR]', detalhe || err.message);
    res.status(500).send(
      `<h2>Erro ao gerar cobrança PIX</h2><pre>${JSON.stringify(detalhe || err.message, null, 2)}</pre>`
    );
  }
});

// ─── APIs PARA PÁGINAS ─────────────────────────────────────────────────────────

app.get('/api/pagamento/:txid', (req, res) => {
  const pedido = pedidos.get(req.params.txid);
  if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado.' });
  res.json(pedido);
});

app.get('/api/status/:txid', async (req, res) => {
  try {
    const cobranca = await consultarCobranca(req.params.txid);
    const pago = cobranca.status === 'CONCLUIDA';

    if (pago) {
      await atualizarStatus(req.params.txid, 'PAGO');
      pedidos.delete(req.params.txid);
    }

    res.json({ status: cobranca.status, pago });
  } catch {
    const vendas = await listarVendas();
    const v = vendas.find(x => x.txid === req.params.txid);
    res.json({ status: v?.status || 'DESCONHECIDO', pago: v?.status === 'PAGO' });
  }
});

app.get('/api/stats', async (req, res) => {
  const vendas = await listarVendas();

  const pagas = vendas.filter(v => v.status === 'PAGO');

  const mesas = pagas
    .filter(v => v.tipo === 'mesa')
    .reduce((acc, v) => acc + parseInt(v.quantidade || 0), 0);

  const individuais = pagas
    .filter(v => v.tipo === 'individual')
    .reduce((acc, v) => acc + parseInt(v.quantidade || 0), 0);

  const arrecadado = pagas
    .reduce((acc, v) => acc + parseFloat(v.total || 0), 0);

  res.json({
    mesas,
    individuais,
    arrecadado: arrecadado.toFixed(2),
    totalVendas: pagas.length,
    pendentes: vendas.filter(v => v.status === 'PENDENTE').length,
    vendas,
  });
});

app.get('/api/exportar-csv', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'vendas.csv');
  res.download(filePath, 'vendas.csv');
});

// ─── WEBHOOK EFÍ BANK ──────────────────────────────────────────────────────────

app.post('/webhook/pix', async (req, res) => {
  res.status(200).send('OK');
  const { pix } = req.body;
  if (!Array.isArray(pix)) return;
  for (const p of pix) {
    if (p.txid) {
      await atualizarStatus(p.txid, 'PAGO');
      pedidos.delete(p.txid);
    }
  }
});

// ─── INICIALIZAÇÃO ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🎟️  Link de Pagamento → http://localhost:${PORT}`);
  console.log(`📊  Admin            → http://localhost:${PORT}/admin.html\n`);
});
