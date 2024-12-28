require('dotenv').config();
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const keyVaultName = process.env.KEY_VAULT_NAME; // Add this to your .env file
const keyVaultUrl = `https://${keyVaultName}.vault.azure.net/`;

console.log(keyVaultUrl,"-----keyVaultUrl");


async function getDatabaseCredentials() {

  const credential = new DefaultAzureCredential();

  const client = new SecretClient(keyVaultUrl, credential);

  // Fetch secrets
  const dbHost = await client.getSecret('DBHOST');

  return {
    host: dbHost.value,
  };
}

(async () => {
  try {
    const dbCredentials = await getDatabaseCredentials();

    console.log('Database Credentials:', dbCredentials);

    // Use the credentials to connect to the database
    // Example for MySQL:
    // const mysql = require('mysql2');
    // const connection = mysql.createConnection({
    //   host: dbCredentials.host,
    //   user: dbCredentials.user,
    //   password: dbCredentials.password,
    //   database: 'your_database_name',
    // });

    // connection.connect((err) => {
    //   if (err) throw err;
    //   console.log('Connected to the database!');
    // });
  } catch (error) {
    console.error('Error fetching secrets from Azure Key Vault:', error);
  }
})();
