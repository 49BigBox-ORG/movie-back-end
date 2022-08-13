const {getAllUser, login, signup} = require('../../repository/user.repository')

const userResolver = {
    Query: {
        user: () => {
            return getAllUser()
        },
    },
    Mutation: {
        signup: (parent, {input}) => {
            return signup(input)
        },
        login: (parent, {input}) => {
            return login(input)
        },
    },
}

module.exports = userResolver
