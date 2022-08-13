const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const APIError = require('../helper/api.helper')
const {verifyAdmin} = require('../helper/jwt.helper')

const getAllActor = async (accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            return await prisma.actor.findMany()
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        return e
    } finally {
        await prisma.$disconnect()
    }
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
    } finally {
        await prisma.$disconnect()
    }
}

const updateActor = async (input, accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            const {id, name, image, birthday, genderId} = input
            await prisma.actor.update({
                where: {id},
                data: {
                    name,
                    image,
                    birthday: new Date(+birthday),
                    genderId,
                },
            })
            return {
                status: true,
            }
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        return e
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    getAllActor,
    insertActor,
    updateActor,
}
