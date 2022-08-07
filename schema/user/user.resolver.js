const {getAllUser, login, insertUser} = require('../../repository/user.repository')

const userResolver = {
    Query: {
        user: () => {
            return getAllUser()
        },
    },
    Mutation: {
        signup: (parent, {input}) => {
            return insertUser(input)
        },
        login: (parent, {input}) => {
            return login(input)
        },
    },
}

module.exports = userResolver
