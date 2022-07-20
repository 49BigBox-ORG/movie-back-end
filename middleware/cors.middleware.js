const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

const corsMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        res.sendStatus(200).end()
    }
    next()
}

module.exports = {
    corsMiddleware,
    corsOptions,
}
