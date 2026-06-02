# Certificado Efí Bank

Coloque aqui o arquivo `.p12` gerado no painel da Efí Bank.

## Como gerar

1. Acesse o painel da Efí Bank → **API → Meus Certificados**
2. Clique em **Criar Certificado**
3. Escolha o ambiente: **Homologação** (testes) ou **Produção**
4. Baixe o arquivo `.p12` e coloque nesta pasta
5. Atualize o `.env`:
   ```
   EFI_CERT_PATH=./certificados/nome-do-arquivo.p12
   EFI_CERT_PASSPHRASE=  # deixe vazio se não tiver senha
   ```

## Configuração no Postman (para testes manuais)

- **File** → Settings → Certificates
- **Homologação:** host `pix-h.api.efipay.com.br`
- **Produção:** host `pix.api.efipay.com.br`
- Selecione o arquivo `.p12` e a senha (se houver)
