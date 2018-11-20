const { ENDPOINT, headers, readHeaders } = require('./config');
const fetch = require('isomorphic-fetch');

let categories;

const categoriesQuery= `{
  categories {
    id
    name
  }
}`

async function fetchCategories() {
  try {
    const body = JSON.stringify({
      "query": categoriesQuery,
    })
    console.log(body);
    const response = await fetch(ENDPOINT, {
      readHeaders,
      method: 'POST',
      body
    });

    // Parse the response to verify success
    const bodyResp = await response.json()
    // const data = await body.data
    console.log(bodyResp);
  } catch (error) {
    console.log("Error!", error);
    process.exit(1);
  }
}

const postMutation = `
  mutation CreatePost( $name: String! ) {
    createPost(data: {
      status: PUBLISHED
      name: $name
    })
    {
      id
      name
    }
  }
`

fetchCategories();
