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
        purchaseMovie(input: PurchaseMovieInput): PurchaseMovieOutput
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

    input PurchaseMovieInput {
        movieId: Int!
        promoCode: String
    }

    type PurchaseMovieOutput {
        movieId: Int!
        accountBalance: AccountBalance!
    }
`

module.exports = typeDefs
