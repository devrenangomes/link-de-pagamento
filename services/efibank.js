const axios = require('axios');
const https = require('https');
const fs = require('fs');

const BASE_URL = process.env.EFI_SANDBOX === 'false'
  ? 'https://pix.api.efipay.com.br'
  : 'https://pix-h.api.efipay.com.br';

function getAgent() {
  const certPath = process.env.EFI_CERT_PATH;
  const options = {};

  if (certPath && fs.existsSync(certPath)) {
    options.pfx = fs.readFileSync(certPath);
    options.passphrase = process.env.EFI_CERT_PASSPHRASE || '';
  } else {
    // Sem certificado: apenas para desenvolvimento local sem mTLS
    options.rejectUnauthorized = false;
  }

  return new https.Agent(options);
}

async function getToken() {
  const creds = Buffer.from(
    `${process.env.EFI_CLIENT_ID}:${process.env.EFI_CLIENT_SECRET}`
  ).toString('base64');

  const { data } = await axios.post(
    `${BASE_URL}/oauth/token`,
    { grant_type: 'client_credentials' },
    {
      headers: {
        Authorization: `Basic ${creds}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: getAgent(),
    }
  );

  return `${data.token_type} ${data.access_token}`;
}

async function criarCobranca({ nome, cpf, valor, descricao }) {
  const token = await getToken();

  const { data } = await axios.post(
    `${BASE_URL}/v2/cob`,
    {
      calendario: { expiracao: 3600 },
      devedor: { cpf, nome },
      valor: { original: valor.toFixed(2) },
      chave: process.env.EFI_PIX_KEY,
      solicitacaoPagador: descricao,
    },
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      httpsAgent: getAgent(),
    }
  );

  return data;
}

async function getQRCode(locId) {
  const token = await getToken();

  const { data } = await axios.get(
    `${BASE_URL}/v2/loc/${locId}/qrcode`,
    {
      headers: { Authorization: token },
      httpsAgent: getAgent(),
    }
  );

  return data;
}

async function consultarCobranca(txid) {
  const token = await getToken();

  const { data } = await axios.get(
    `${BASE_URL}/v2/cob/${txid}`,
    {
      headers: { Authorization: token },
      httpsAgent: getAgent(),
    }
  );

  return data;
}

module.exports = { criarCobranca, getQRCode, consultarCobranca };
