const {getAllProfile, getUserProfile, updateProfile} = require('../../repository/profile.repository')

const profileResolver = {
    Query: {
        profile: () => {
            return getAllProfile()
        },
    },
    Mutation: {
        getUserProfile: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getUserProfile(input, accessToken)
        },
        updateProfile: (parent, {input}) => {
            return updateProfile(input)
        },
    },
}

module.exports = profileResolver
