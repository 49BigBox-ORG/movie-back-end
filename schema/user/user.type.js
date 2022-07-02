const gql = require('graphql-tag');

const typeDefs = gql`
    type User {
        id: Int,
        username: String,
        password: String,
    }

    type Query {
        user: [User]
    }
    
    type Mutation {
        signup(input: UserInput): UserOutput
    }
    
    input UserInput {
        username: String,
        password: String,
        full_name: String,
        email: String,
        phone_number: String,
        birth_date: String,
    }
    
    type UserOutput{
        username: String,
        password: String,
        roleName: String,
    }
`

module.exports = typeDefs
