const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRED_TIME,
        },
        {algorithm: 'HS256'}
    )
}

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const checkAuthen = (req, res, next) => {
    const token = req.headers['x-access-token']
    const decoded = decodeToken(token)
    if (decoded) {
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
}

module.exports = {
    generateToken,
    decodeToken,
    checkAuthen,
}
