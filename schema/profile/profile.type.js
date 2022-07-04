const gql = require('graphql-tag');

const typeDefs = gql`
    type Profile {
        userId: Int,
        fullName: String,
        email: String,
        phoneNumber: String,
        birthday: String,
        createdAt: String,
    }

    type Query {
        profile: Profile
    }

    type Mutation {
        getProfileById(input: ProfileInput): Profile,
        updateProfile(input: UpdateProfileInput): Profile,
    }

    input ProfileInput {
        userId: Int!,
    }
    
    input UpdateProfileInput {
        userId: Int!,
        fullName: String,
        email: String,
        phoneNumber: String,
        birthday: String,
    }
`

module.exports = typeDefs
