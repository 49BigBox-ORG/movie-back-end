const {getAllActor, insertActor, updateActor} = require('../../repository/actor.repository')

const actorResolver = {
    Query: {
        actor: (arent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getAllActor(accessToken)
        },
    },
    Mutation: {
        insertActor: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return insertActor(input, accessToken)
        },
        updateActor: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return updateActor(input, accessToken)
        },
    },
}

module.exports = actorResolver
