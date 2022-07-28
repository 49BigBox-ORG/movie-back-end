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
        return {
            status: true,
            data: jwt.verify(token, process.env.SECRET_KEY),
        }
    } catch (e) {
        if (e == 'TokenExpiredError: jwt expired') {
            return {
                status: false,
                message: 'Session expired. Please login again!',
            }
        }
        return {
            status: false,
            message: 'Access denied. Please try again!',
        }
    }
}

const verifyAdmin = (token) => {
    const decoded = decodeToken(token)
    if (decoded.status) {
        if (decoded.data.roleName === 'ADMIN') {
            return {
                status: true,
            }
        }
    }
    return decoded
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
    verifyAdmin,
}
