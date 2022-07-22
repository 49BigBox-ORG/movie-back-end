const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const getAllGender = async () => {
    return await prisma.gender.findMany()
}

module.exports = {
    getAllGender,
}
