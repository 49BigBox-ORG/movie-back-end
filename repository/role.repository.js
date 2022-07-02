const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const getAllRole = async () => {
    return await prisma.role.findMany()
}

const insertRole = async (input) => {
    try {
        await prisma.role.create({
            data: {
                roleName: input.roleName
            }
        })
        return {
            roleName: input.roleName
        }
    } catch (e) {
        return {
            id: null,
            roleName: null
        }
    }
}

module.exports = {
    getAllRole,
    insertRole
}
