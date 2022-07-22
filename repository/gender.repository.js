const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const getAllGender = () => {
    return prisma.gender.findMany()
}

module.exports = {
    getAllGender,
}
