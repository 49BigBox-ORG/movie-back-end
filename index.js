const express = require('express')
const cors = require('cors')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema')
const allowCors = require('./middleware/allowCors')

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

const port = 3000

app.use(express.json())

app.use(cors(corsOptions))

const middleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
}

app.use(
    '/api',
    middleware,
    allowCors,
    graphqlHTTP({
        schema: schema,
        graphiql: true,
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
