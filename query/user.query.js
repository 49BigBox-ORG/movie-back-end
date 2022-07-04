const insertUserSchema = (_username, _password, _full_name, _email, _phone_number, _birth_day) => {
    return {
        data: {
            username: _username,
            password: _password
        },
        user_role: {
            create: {
                data: {
                    role: 2, // 1 for admin, 2 is for user
                }
            }
        },
        profile: {
            create: {
                data: {
                    full_name: _full_name,
                    email: _email,
                    phone_number: _phone_number,
                    birth_date: _birth_day,
                }
            }
        },
        account_balance: {
            create: {
                data: {
                    balance: 50 // Default 50$
                }
            }
        }
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
