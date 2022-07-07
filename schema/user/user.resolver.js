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
        login: (parent, {input}, context) => {
            console.log(context.headers.authorization)
            return login(input)
        },
    },
}

module.exports = userResolver
