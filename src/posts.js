const { ENDPOINT, headers} = require('./config');
const csv = require('csvtojson');
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
    const response = await fetch(ENDPOINT, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        query: categoriesQuery
      })
    });

    // Parse the response to verify success
    const body = await response.json()
    const data = await body.data
    return data.categories;
  } catch (error) {
    console.log("Error!", error);
    process.exit(1);
  }
}

const postMutation = `
  mutation CreatePost( $title: String!, $content: String!, $slug: String!, $categories: [CategoryWhereUniqueInput!]) {
    createPost(data: {
      status: PUBLISHED
      title: $title
      content: $content
      slug: $slug
      categories: {
        connect: $categories
      }
    })
    {
      id
      title
    }
  }
`

function getCategoryByName(name) {
  return categories.find(category => (category.name === name))
}

async function createPosts() {
  categories = await fetchCategories();
  const rows = await csv().fromFile('./data/posts.csv');
  rows.map(async row => {
    const rowCats = row.categories.split("|")
    const formattedCats = rowCats.map(cat => {
      const id = getCategoryByName(cat).id
      return { "id": id}
    });
    const formattedObj = {
      ...row,
      categories: formattedCats
    }
    try {
      const response = await fetch(ENDPOINT, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          query: postMutation,
          variables: formattedObj
        })
      });

      // Parse the response to verify success
      const body = await response.json()
      const data = await body.data

      console.log('Uploaded', data);
      return
    } catch (error) {
      console.log("Error!", error);
      process.exit(1);
    }
  })
}

createPosts();
