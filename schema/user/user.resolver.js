const {getAllUser, insertUser} = require("../../repository/user.repository");


const userResolver = {
    Query: {
        user: () => {
            return getAllUser()
        }
    },
    Mutation: {
        signup: (parent, {input}) => {
            return insertUser(input)
        }
    }
}

module.exports = userResolver;
