const gql = require('graphql-tag')

const typeDefs = gql`
    type Profile {
        userId: Int
        fullName: String
        email: String
        phoneNumber: String
        birthday: String
        createdAt: String
    }

    type Query {
        profile: Profile
    }

    type Mutation {
        getUserProfile(input: getUserProfileInput): GetUserProfileOutput
        updateProfile(input: UpdateProfileInput): Profile
        updateAvatar(input: UpdateAvatar): AvatarOutput
    }

    input getUserProfileInput {
        username: String!
    }

    type GetUserProfileOutput {
        username: String
        avatar: String
        fullName: String
        email: String
        phoneNumber: String
        birthday: String
        gender: String
    }

    input UpdateProfileInput {
        userId: Int!
        fullName: String
        email: String
        phoneNumber: String
        birthday: String
    }

    input UpdateAvatar {
        avatar: String!
    }

    type AvatarOutput {
        avatar: String!
    }
`

module.exports = typeDefs
