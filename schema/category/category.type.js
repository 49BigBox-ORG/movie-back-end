const gql = require('graphql-tag')

const typeDefs = gql`
    type Category {
        id: Int
        categoryName: String
    }

    type Query {
        category: [Category]
    }
`

module.exports = typeDefs
