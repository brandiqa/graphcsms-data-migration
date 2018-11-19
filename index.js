require('dotenv').config();
const csv = require('csvtojson');

const { ENDPOINT, TOKEN } = process.env;

if (!ENDPOINT || !TOKEN) {
  console.error('Configure .env file and set ENDPOINT and TOKEN values.')
  process.exit(1);
}
