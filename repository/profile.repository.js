const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const getAllProfile = async () => {
    return await prisma.profile.findMany()
}

const getProfileById = async (input) => {
    try{
        return await prisma.profile.findUnique({
            where: {
                id: input.id
            }
        })
    }catch (e) {
        return null
    }
}

const updateProfile = async (input) => {
    try{
        return await prisma.profile.update({
            where: {
                id: input.id
            },
            data: {
                fullName: input.fullName,
                email: input.email,
                phoneNumber: input.phoneNumber,
                birthday: input.birthday
            }
        })
    }catch (e) {
        return null
    }
}

module.exports = {
    getAllProfile,
    getProfileById,
    updateProfile,
}
