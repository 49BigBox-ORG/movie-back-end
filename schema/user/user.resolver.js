const {getAllUser, login, signup} = require('../../repository/user.repository')

const userResolver = {
    Query: {
        user: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getAllUser(accessToken)
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
