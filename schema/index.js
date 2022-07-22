const {makeExecutableSchema} = require('@graphql-tools/schema')
const merge = require('lodash.merge')

const userSchema = require('./user')
const roleSchema = require('./role')
const userRoleSchema = require('./userRole')
const profileSchema = require('./profile')
const accountBalanceSchema = require('./accountBalance')
const genderSchema = require('./gender')

const schema = makeExecutableSchema({
    typeDefs: [
        userSchema.typeDefs,
        roleSchema.typeDefs,
        userRoleSchema.typeDefs,
        profileSchema.typeDefs,
        accountBalanceSchema.typeDefs,
        genderSchema.typeDefs,
    ],
    resolvers: merge(
        userSchema.resolver,
        roleSchema.resolver,
        userRoleSchema.resolver,
        profileSchema.resolver,
        accountBalanceSchema.resolver,
        genderSchema.resolver
    ),
})

module.exports = schema
