const {PrismaClient} = require('@prisma/client');
const {insertUserSchema} = require("../query/user.query");
const prisma = new PrismaClient();

const getAllUser = async () => {
    return await prisma.user.findMany()
}

const getUserById = async (input) => {
    try {
        const user = await prisma.$queryRaw`
            SELECT username, password, "roleName" FROM "User" 
            JOIN "UserRole" ON "UserRole"."userId" = "User"."id"
            JOIN "Role" ON "UserRole"."roleId" = "Role"."id"
            WHERE "User"."id" = ${input.id}
        `
        console.log(getUser, 'getUser')
        return user[0]
    } catch (e) {
        return e

    }
}

const insertUser = async (input) => {
    try {
        await prisma.user.create(insertUserSchema(input.username, input.password, input.full_name, input.email, input.phone_number, input.birth_date))
        return true
    } catch (e) {
        return false
    }
}

module.exports = {
    getAllUser,
    getUserById,
    insertUser
}
