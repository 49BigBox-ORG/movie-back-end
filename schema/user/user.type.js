const gql = require('graphql-tag');

const typeDefs = gql`
    type User {
        id: Int,
        username: String,
        password: String,
        profile: Profile,
    }

    type Query {
        user: [User]
    }
    
    type Mutation {
        signup(input: SignUpInput): SignUpOutput,
        getUserById(input: GetUserByIdInput): GetUserByIdOutput,
    }
    
    input SignUpInput {
        username: String,
        password: String,
        full_name: String,
        email: String,
        phone_number: String,
        birth_date: String,
    }
    
    type SignUpOutput{
        username: String,
        password: String,
        roleName: String,
    }
    
    input GetUserByIdInput {
        id: Int!
    }
    
    type GetUserByIdOutput {
        username: String,
        password: String,
        roleName: String,
    }
`

module.exports = typeDefs
