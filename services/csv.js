const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

const DATA_DIR = path.join(__dirname, '../data');
const CSV_FILE = path.join(DATA_DIR, 'vendas.csv');
const HEADERS = ['id', 'data', 'nome', 'cpf', 'email', 'telefone', 'tipo', 'quantidade', 'total', 'status', 'txid'];

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CSV_FILE)) {
    fs.writeFileSync(CSV_FILE, HEADERS.join(',') + '\n', 'utf8');
  }
}

function escapeField(value) {
  const s = value == null ? '' : String(value);
  return s.includes(',') || s.includes('"') || s.includes('\n')
    ? `"${s.replace(/"/g, '""')}"`
    : s;
}

function rowToLine(obj) {
  return HEADERS.map(h => escapeField(obj[h])).join(',');
}

async function listarVendas() {
  ensureFile();
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(CSV_FILE)
      .pipe(csvParser())
      .on('data', row => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', reject);
  });
}

async function salvarVenda(venda) {
  ensureFile();
  fs.appendFileSync(CSV_FILE, rowToLine(venda) + '\n', 'utf8');
}

async function atualizarStatus(txid, novoStatus) {
  const vendas = await listarVendas();
  const atualizadas = vendas.map(v =>
    v.txid === txid ? { ...v, status: novoStatus } : v
  );
  const conteudo =
    HEADERS.join(',') + '\n' +
    atualizadas.map(rowToLine).join('\n') + '\n';
  fs.writeFileSync(CSV_FILE, conteudo, 'utf8');
}

module.exports = { salvarVenda, listarVendas, atualizarStatus };
