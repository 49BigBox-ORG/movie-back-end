const express = require('express')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema')
const {corsMiddleware} = require('./middleware/cors.middleware')
const port = 3000

app.use(express.json())

app.use(
    '/api',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
        corsMiddleware,
        customFormatErrorFn: (error) => {
            return {
                message: error.originalError.message || error.message,
                status: error.originalError.status || 500,
            }
        },
    })
)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app
