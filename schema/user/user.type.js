const gql = require('graphql-tag')

const typeDefs = gql`
    type User {
        id: Int
        username: String
        password: String
        profile: Profile
        userRole: UserRole
        accountBalance: AccountBalance
    }

    type Query {
        user: [User]
    }

    type Mutation {
        signup(input: SignUpInput): SignUpOutput
        login(input: LoginInput): LoginOutput
    }

    input SignUpInput {
        username: String
        password: String
        fullName: String
        email: String
        phoneNumber: String
        birthday: String
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
