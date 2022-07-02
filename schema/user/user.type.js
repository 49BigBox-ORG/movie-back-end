const gql = require('graphql-tag');

const typeDefs = gql`
    type Post {
        id: Int,
        author_id: Int,
        title: String,
        updatedAt: String,
        published: Boolean,
    }

    type Query {
        posts: [Post]
    }
    type Mutation {
        insertPost(input: PostMutation): Boolean
    }
    input PostMutation {
        author_id: Int,
        title: String,
        published: Boolean,
    }
`

module.exports = typeDefs
