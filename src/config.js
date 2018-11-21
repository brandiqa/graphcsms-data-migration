require('dotenv').config();
const { ENDPOINT, TOKEN } = process.env;

if (!ENDPOINT || !TOKEN) {
  console.error('ERROR: Failed to load ENDPOINT and TOKEN values from .env file.')
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`
}

module.exports = {
  ENDPOINT,
  TOKEN,
  headers
}
