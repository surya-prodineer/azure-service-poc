require('dotenv').config();
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const keyVaultName = process.env.KEY_VAULT_NAME; // Add this to your .env file
const keyVaultUrl = `https://${keyVaultName}.vault.azure.net/`;


module.exports.getDatabaseCredentials = async () => {

  const credential = new DefaultAzureCredential();

  const client = new SecretClient(keyVaultUrl, credential);

  // Fetch secrets
  const dbHost = await client.getSecret('DBHOST');

  return {
    host: dbHost.value,
  };
}
