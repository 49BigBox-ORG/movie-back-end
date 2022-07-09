const bcrypt = require('bcryptjs')

const generateHashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = generateHashPassword
