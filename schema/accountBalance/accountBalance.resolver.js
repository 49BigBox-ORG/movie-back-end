const {deposit, getAccountBalanceByUserId} = require("../../repository/accountBalance.repository");

const accountBalanceResolver = {
    Query: {
        accountBalance: (input) => {
            return getAccountBalanceByUserId(input)
        }
    },
    Mutation: {
        deposit: (input) => {
            return deposit(input)
        }
    }
}

module.exports = accountBalanceResolver;
