const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const getAllCategory = async () => {
    return await prisma.category.findMany()
}

module.exports = {
    getAllCategory,
}
