const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const getAccountBalanceByUserId = async (input) => {
    return await prisma.accountBalance.findUnique({
        where: {
            userId: input.userId
        }
    })
}

const deposit = async (input) => {
    return await prisma.accountBalance.update({
        where: {
            userId: input.userId
        },
        data: {
            balance: {
                increment: input.deposit
            }
        }
    })
}

module.exports = {
    getAccountBalanceByUserId,
    deposit
}
