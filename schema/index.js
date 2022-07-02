const {makeExecutableSchema} = require('graphql-tools')
const merge = require('lodash.merge')

const categorySchema = require('./category')
const postsSchema = require('./posts')

const schema = makeExecutableSchema({
    typeDefs: [
        categorySchema.typeDefs,
        postsSchema.typeDefsPosts
    ],
    resolvers: merge(
        categorySchema.resolver,
        postsSchema.resolverPosts
    )
})

module.exports = schema
