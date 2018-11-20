require('dotenv').config();
const { ENDPOINT, WRITE_TOKEN, READ_TOKEN } = process.env;

if (!ENDPOINT || !WRITE_TOKEN) {
  console.error('ERROR: Failed to load ENDPOINT and TOKEN values from .env file.')
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${WRITE_TOKEN}`
}

const readHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${READ_TOKEN}`
}

module.exports = {
  ENDPOINT,
  headers,
  readHeaders
}
