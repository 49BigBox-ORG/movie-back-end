const {
    deposit,
    getAccountBalanceByUserId,
    getUserBalance,
    purchaseMovie,
} = require('../../repository/accountBalance.repository')

const accountBalanceResolver = {
    Query: {
        accountBalance: (input) => {
            return getAccountBalanceByUserId(input)
        },
    },
    Mutation: {
        deposit: (input) => {
            return deposit(input)
        },
        getUserBalance: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getUserBalance(input, accessToken)
        },
        purchaseMovie: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return purchaseMovie(input, accessToken)
        },
    },
}

module.exports = accountBalanceResolver
