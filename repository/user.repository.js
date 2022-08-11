const {PrismaClient} = require('@prisma/client')
const {insertUserSchema} = require('../query/user.query')
const {generateToken} = require('../helper/jwt.helper')
const {generateHashPassword, verifyPassword} = require('../helper/bcrypt.helper')
const APIError = require('../helper/api.helper')
const prisma = new PrismaClient()

const getAllUser = async () => {
    try {
        return await prisma.user.findMany()
    } catch (e) {
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    } finally {
        await prisma.$disconnect()
    }
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
        console.log(e)
        return {
            status: 'error',
            message: e,
        }
    } finally {
        await prisma.$disconnect()
    }
}

const login = async (input) => {
    const {username, password} = input
    try {
        const userData = await prisma.user.findUnique({
            where: {
                username: username.toLowerCase(),
            },
            include: {
                userRole: {
                    include: {
                        role: true,
                    },
                },
                profile: true,
            },
        })

        if (userData) {
            const userInfo = {
                userId: userData.id,
                username: userData.username,
                password: userData.password,
                fullName: userData.profile.fullName,
                avatar: userData.profile.avatar,
                birthday: userData.profile.birthday,
                email: userData.profile.email,
                phoneNumber: userData.profile.phoneNumber,
                roleName: userData.userRole.role.roleName,
            }

            const isSuccess = verifyPassword(password, userInfo.password)
            if (isSuccess) {
                const accessToken = generateToken(userInfo)
                return {
                    ...userInfo,
                    accessToken,
                }
            } else {
                throw new APIError({status: 404, message: 'Password is incorrect. Please try again.'})
            }
        } else {
            throw new APIError({status: 404, message: 'Username is not exist. Please sign up first or try again.'})
        }
    } catch (error) {
        return new APIError({status: 404, message: error.message || 'Login failed. Please try again.'})
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    getAllUser,
    insertUser,
    login,
}
