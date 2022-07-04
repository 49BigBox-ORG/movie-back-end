const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const getAllUserRole = async () => {
    return await prisma.userRole.findMany()
}

const getUserRoleById = async (input) => {
    try{
        return await prisma.userRole.findUnique({
            where: {
                userId: input.userId,
            }
        })
    }catch (e) {
        return null
    }
}

const updateUserRole = async (input) => {
    if (input.userId || input.roleId) {
        try {
            await prisma.userRole.update({
                where: {
                    userId: input.userId,
                },
                data: {
                    userId: input.userId,
                    roleId: input.roleId
                }
            })
            return true
        } catch (e) {
            return false
        }
    } else {
        return false
    }
}

module.exports = {
    getAllUserRole,
    getUserRoleById,
    updateUserRole
}
