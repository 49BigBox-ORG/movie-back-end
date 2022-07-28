const {getAllActor, insertActor} = require('../../repository/actor.repository')

const actorResolver = {
    Query: {
        actor: () => {
            return getAllActor()
        },
    },
    Mutation: {
        insertActor: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return insertActor(input, accessToken)
        },
        updateActor: () => {
            return {
                id: 1,
                name: 'John Doe',
                image: 'https://randomuser.me/api/portraits/',
                birthday: '01/01/2000',
                gender: 'Male',
            }
        },
    },
}

module.exports = actorResolver
