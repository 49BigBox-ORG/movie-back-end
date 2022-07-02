const { PrismaClient } = require('@prisma/client');
const {insertUserSchema} = require("../query/user.query");
const prisma = new PrismaClient()

const getAllUser = async () => {
    return await prisma.user.findMany()
}

const insertUser = async (input) => {
    if(input.username || input.password) {
        try {
            await prisma.user.create(insertUserSchema(input.username, input.password, input.full_name, input.email, input.phone_number, input.birth_date))
            return true
        }catch (e) {
            return false
        }
    }else {
        return false
    }
}

module.exports = {
    getAllUser,
    insertUser
}
