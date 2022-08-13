const {getAllUser, login, signup, updateUserAdmin, deleteUserAdmin} = require('../../repository/user.repository')

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
        updateUserAdmin: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return updateUserAdmin(input, accessToken)
        },
        deleteUserAdmin: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return deleteUserAdmin(input, accessToken)
        },
    },
}

module.exports = userResolver
