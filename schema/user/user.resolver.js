const {getAllUser, getUserById, insertUser } = require("../../repository/user.repository");

const userResolver = {
    Query: {
        user: () => {
            return getAllUser()
        }
    },
    Mutation: {
        signup: (parent, {input}) => {
            return insertUser(input)
        },
        getUserById: (parent, {input}) => {
            return getUserById(input)
        },
    }
}

module.exports = userResolver;
