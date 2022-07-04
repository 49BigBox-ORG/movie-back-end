const gql = require('graphql-tag');

const typeDefs = gql`
    type AccountBalance {
        userId: Int,
        balance: Int,
    }
    
    type Query {
        accountBalance(input: AccountBalanceInput): AccountBalance
    }
    
    type Mutation {
        deposit(input: DepositInput): AccountBalance
    }
    
    input AccountBalanceInput {
        userId: Int!,
    }
    
    input DepositInput {
        userId: Int!,
        deposit: Int!,
    }
`

module.exports = typeDefs
