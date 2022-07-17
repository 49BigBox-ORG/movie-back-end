const {PrismaClient} = require('@prisma/client')
const {insertUserSchema} = require('../query/user.query')
const {generateToken} = require('../helper/jwt.helper')
const {generateHashPassword, verifyPassword} = require('../helper/bcrypt.helper')
const APIError = require('../helper/api.helper')
const prisma = new PrismaClient()

const getAllUser = async () => {
    return await prisma.user.findMany()
}

const insertUser = async (input) => {
    const {username, password, fullName, email, phoneNumber, birthday} = input
    const hashPassword = generateHashPassword(password)

    try {
        await prisma.user.create(insertUserSchema(username, hashPassword, fullName, email, phoneNumber, birthday))
        return {
            username: username,
            password: password,
            roleName: 'USER',
        }
    } catch (e) {
        return {
            status: 'error',
            message: e,
        }
    }
}

const login = async (input) => {
    const {username, password} = input
    try {
        const userInfo = await prisma.$queryRaw`
            SELECT username, password, "fullName", email, "phoneNumber", "roleName" FROM "User" as U
            JOIN "UserRole" as UR ON UR."userId" = U."id"
            JOIN "Role" as R ON UR."roleId" = R."id"
            JOIN "Profile" as P ON P."userId" = U."id"
            WHERE U."username" = ${username.toLowerCase()}
        `
        if (userInfo.length !== 0) {
            const isSuccess = verifyPassword(password, userInfo[0].password)
            if (isSuccess) {
                const accessToken = generateToken(userInfo[0])
                return {
                    ...userInfo[0],
                    accessToken,
                }
            } else {
                throw new APIError({status: 404, message: 'Password is incorrect. Please try again.'})
                // const error = new APIError(500, 'Password is incorrect. Please try again.')
                // throw error
            }
        } else {
            throw new APIError({status: 404, message: 'Username is not exist. Please sign up first or try again.'})
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    getAllUser,
    insertUser,
    login,
}
