const express = require('express')
// const cors = require('cors')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema')

// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200,
// }

const port = 8080

app.use(express.json())

// app.use(cors(corsOptions))

// const middleware = (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     // another common pattern
//     // res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     )
//     if (req.method === 'OPTIONS') {
//         res.status(200).end()
//     }
//     next()
// }

app.use(
    '/api',
    // middleware,
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
