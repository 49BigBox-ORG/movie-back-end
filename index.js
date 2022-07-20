const express = require('express')
const cors = require('cors')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema')

const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
}

const port = 3000

app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use(cors(corsOptions))

app.use(
    '/api',
    function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        next()
    },
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
