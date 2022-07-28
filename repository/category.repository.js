const {PrismaClient} = require('@prisma/client')
const {verifyAdmin} = require('../helper/jwt.helper')
const prisma = new PrismaClient()
const APIError = require('../helper/api.helper')

const getAllCategory = async () => {
    return await prisma.category.findMany()
}

const insertCategory = async (input, accessToken) => {
    const {categoryName} = input
    const isAdmin = verifyAdmin(accessToken)
    if (isAdmin.status) {
        try {
            return await prisma.category.create({
                data: {
                    categoryName,
                },
            })
        } catch (e) {
            if (e.code === 'P2002') {
                return new APIError({
                    status: 400,
                    message: `Category is already exist. Please try again.`,
                })
            }
            return new APIError({
                status: 400,
                message: `Something went wrong. Please try again!`,
            })
        }
    } else {
        return new APIError({status: 400, message: 'You are not ADMIN. Please try with administrator account!'})
    }
}

const deleteCategory = async (input, accessToken) => {
    const {categoryName} = input
    const isAdmin = verifyAdmin(accessToken)
    if (isAdmin.status) {
        try {
            await prisma.category.delete({
                where: {
                    categoryName,
                },
            })
            return {
                categoryName: categoryName,
            }
        } catch (e) {
            console.log(e)
            if (e.code === 'P2025') {
                return new APIError({
                    status: 400,
                    message: `Category is not be found. Please try again.`,
                })
            }
            return new APIError({
                status: 400,
                message: `Something went wrong. Please try again.`,
            })
        }
    } else {
        return new APIError({status: 400, message: 'Access denied. Please try with administrator account!'})
    }
}

module.exports = {
    getAllCategory,
    insertCategory,
    deleteCategory,
}
