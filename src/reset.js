const { ENDPOINT, headers } = require('./config');
const fetch = require('isomorphic-fetch');

// Comments Reset Mutation
const commentsMutation = `
  mutation DeleteAllComments {
    deleteManyComments(where: {
      status: PUBLISHED
    })
    {
      count
    }
  }`;

// Posts Reset Mutation
const postsMutation = `
  mutation DeleteAllPosts {
    deleteManyPosts(where: {
      status: PUBLISHED
    })
    {
      count
    }
  }`;

// Categories Reset Mutation
const categoriesMutation = `
  mutation DeleteAllCategories {
    deleteManyCategories(where: {
      status: PUBLISHED
    })
    {
      count
    }
  }`;

async function deleteModel(mutation) {
  try {
    const response = await fetch(ENDPOINT, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query: mutation
      })
    });

    // Parse the response to verify success
    const body = await response.json()
    const data = await body.data

    console.log('Deleted', data)
  } catch (error) {
    console.log("Error!", error)
  }
}

deleteModel(commentsMutation);
deleteModel(postsMutation);
deleteModel(categoriesMutation);