const gql = require('nanogql')

module.exports = {
  allTasks: gql`
    query {
      allTasks {
        id
        title
        createdAt
        completedAt
        parent {
          id
        }
      }
    }
  `
}
