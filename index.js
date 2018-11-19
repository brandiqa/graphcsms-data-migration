require('dotenv').config();
const csv = require('csvtojson');
const fetch = require('isomorphic-fetch')

const { ENDPOINT, TOKEN } = process.env;

if (!ENDPOINT || !TOKEN) {
  console.error('Configure .env file and set ENDPOINT and TOKEN values.')
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`
}

const categoriesMutation = `
  mutation CreateCategory( $name: String! ) {
    createCategory(data: {
      status: PUBLISHED
      name: $name
    })
    {
      id
      name
    }
  }
`

// Upload Data to GraphCMS Project Database
async function uploadData(file, mutation){
  const rows = await csv().fromFile(file);
  console.log(`Uploading ${rows.length} rows...`);
  rows.map(async row => {
    const formattedObj = { ...row, status: 'PUBLISHED' }
    try{
      const response = await fetch(ENDPOINT, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          query: mutation,
          variables: formattedObj
        })
      });

      // Parse the response to verify success
      const body = await response.json()
      const data = await body.data

      console.log('Uploaded', data)
      return
    } catch (error) {
      console.log("Error!", error)
    }
  })
}

// Upload Categories
uploadData('./data/categories.csv', categoriesMutation);
