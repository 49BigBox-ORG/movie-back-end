const {getAllProfile, getProfileById, updateProfile} = require("../../repository/profile.repository");

const profileResolver = {
    Query: {
        profile: () => {
            return getAllProfile()
        }
    },
    Mutation: {
        getProfileById: (input) => {
            return getProfileById(input)
        },
        updateProfile: (parent, {input}) => {
            return updateProfile(input)
        }
    }
}

module.exports = profileResolver;
