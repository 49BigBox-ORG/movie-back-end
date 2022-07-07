const insertUserSchema = (_username, _password, _fullName, _email, _phoneNumber, _birthday) => {
    return {
        include: {
            userRole: true,
            profile: true,
            accountBalance: true,
        },
        data: {
            username: _username,
            password: _password,
            profile: {
                create: {
                    fullName: _fullName,
                    email: _email,
                    phoneNumber: _phoneNumber,
                    birthday: _birthday,
                },
            },
            userRole: {
                create: {
                    roleId: 2, // 1 for admin, 2 is for user
                },
            },
            accountBalance: {
                create: {
                    balance: 50, // Default 50$
                },
            },
        },
    };
}

const deleteUserSchema = (_id) => {
    return {
        where: {
            id: _id
        }
    }
}

module.exports = {
    insertUserSchema,
    deleteUserSchema
}
