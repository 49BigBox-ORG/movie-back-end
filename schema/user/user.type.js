const gql = require('graphql-tag')

const typeDefs = gql`
    type User {
        id: Int
        username: String
        password: String
    }

    type Query {
        user: [GetAllUserOutput]
    }

    type Mutation {
        signup(input: SignUpInput): SignUpOutput
        login(input: LoginInput): LoginOutput
    }

    type GetAllUserOutput {
        id: Int
        username: String
        avatar: String
        fullName: String
        email: String
        phoneNumber: String
        birthday: String
        roleName: String
        genderId: Int
    }

    input SignUpInput {
        username: String
        password: String
        fullName: String
        email: String
        phoneNumber: String
        birthday: String
        genderId: Int
    }

    type SignUpOutput {
        username: String
        password: String
        roleName: String
    }

    input LoginInput {
        username: String
        password: String
    }

    type LoginOutput {
        username: String
        avatar: String
        fullName: String
        email: String
        phoneNumber: String
        roleName: String
        accessToken: String
    }
`

module.exports = typeDefs
