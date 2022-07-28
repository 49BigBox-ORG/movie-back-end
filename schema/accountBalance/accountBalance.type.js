const gql = require('graphql-tag')

const typeDefs = gql`
    type AccountBalance {
        userId: Int
        balance: Int
    }

    type Query {
        accountBalance(input: AccountBalanceInput): AccountBalance
    }

    type Mutation {
        getUserBalance(input: getUserBalanceInput): getUserBalanceOutput
        deposit(input: DepositInput): AccountBalance
    }

    input AccountBalanceInput {
        userId: Int!
    }

    input getUserBalanceInput {
        username: String!
    }

    type getUserBalanceOutput {
        username: String
        balance: Int!
    }

    input DepositInput {
        userId: Int!
        deposit: Int!
    }
`

module.exports = typeDefs
