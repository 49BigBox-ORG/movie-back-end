const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const APIError = require('../helper/api.helper')
const {verifyAdmin} = require('../helper/jwt.helper')
const getAllActor = async () => {
    return await prisma.actor.findMany()
}

const insertActor = async (input, token) => {
    try {
        const {name, image, birthday, genderId} = input
        const isAdmin = verifyAdmin(token)
        if (isAdmin.status) {
            return await prisma.actor.create({
                data: {
                    name,
                    image,
                    birthday,
                    genderId,
                },
            })
        } else {
            return new APIError({status: 400, message: 'You are not ADMIN. Please try with administrator account!'})
        }
    } catch (e) {
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    }
}

module.exports = {
    getAllActor,
    insertActor,
}
