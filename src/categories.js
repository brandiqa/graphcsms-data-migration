const { ENDPOINT, headers } = require('./config');
const csv = require('csvtojson');
const fetch = require('isomorphic-fetch');

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
async function uploadCategories(){
  const rows = await csv().fromFile('./data/categories.csv');
  console.log(`Uploading ${rows.length} categories...`);
  rows.map(async row => {
    const formattedObj = { ...row, status: 'PUBLISHED' }
    try{
      const response = await fetch(ENDPOINT, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          query: categoriesMutation,
          variables: formattedObj
        })
      });

      // Parse the response to verify success
      const body = await response.json()
      const data = await body.data

      console.log('Uploaded', data);
      return;
    } catch (error) {
      console.log("Error!", error);
      process.exit(1);
    }
  })
  return true;
}

uploadCategories();

module.exports = {
  uploadCategories
}
