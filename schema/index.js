const {makeExecutableSchema} = require('graphql-tools')
const merge = require('lodash.merge')

const userSchema = require('./user')
const roleSchema = require('./role')

const schema = makeExecutableSchema({
    typeDefs: [
        userSchema.typeDefs,
        roleSchema.typeDefs
    ],
    resolvers: merge(
        userSchema.resolver,
        roleSchema.resolver,
    )
})

module.exports = schema
