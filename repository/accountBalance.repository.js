const {PrismaClient} = require('@prisma/client')
const {decodeToken} = require('../helper/jwt.helper')
const prisma = new PrismaClient()
const APIError = require('../helper/api.helper')

const getAccountBalanceByUserId = async (input) => {
    return await prisma.accountBalance.findUnique({
        where: {
            userId: input.userId,
        },
    })
}

const deposit = async (input) => {
    return await prisma.accountBalance.update({
        where: {
            userId: input.userId,
        },
        data: {
            balance: {
                increment: input.deposit,
            },
        },
    })
}

const getUserBalance = async (input, accessToken) => {
    const decoded = decodeToken(accessToken)
    try {
        if (decoded.status) {
            const user = await prisma.user.findUnique({
                where: {
                    username: input.username.toLowerCase(),
                },
                include: {
                    accountBalance: true,
                },
            })
            return {
                username: user.username,
                balance: user.accountBalance.balance,
            }
        } else return new APIError({status: 403, message: decoded.message})
    } catch (e) {
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    }
}

module.exports = {
    getAccountBalanceByUserId,
    deposit,
    getUserBalance,
}
