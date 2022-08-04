const {PrismaClient} = require('@prisma/client')
const APIError = require('../helper/api.helper')
const {groupBy, refetch} = require('../helper/common.helper')
const prisma = new PrismaClient()

let refetchCount = 0

const getAllMovieCast = async () => {
    try {
        const data = await prisma.movieCast.findMany({
            include: {
                actor: true,
            },
        })
        const newDataGroupBy = groupBy(data, (movieCast) => movieCast.movieId)
        let responseArr = []
        newDataGroupBy.forEach((item) => {
            responseArr.push({
                movieId: item[0].movieId,
                actor: item.map((actor) => {
                    return actor.actor
                }),
            })
        })
        refetchCount = 0
        return responseArr
    } catch (e) {
        refetchCount++
        refetch(refetchCount, getAllMovieCast, null, 400, 'Server is busy. Please try again!')
    }
}

const getMovieCastByMovieId = async (input) => {
    const {movieId} = input
    try {
        const data = await prisma.movieCast.findMany({
            where: {
                movieId: movieId,
            },
            include: {
                actor: true,
            },
        })

        const actorArray = data.map((item) => {
            return {
                ...item.actor,
            }
        })
        return {
            movieId: movieId,
            actors: actorArray,
        }
    } catch (e) {
        if (refetchCount < 3) {
            refetchCount++
            switch (refetchCount) {
                case 1:
                    console.log('Ah shit! Here we go again!')
                    break
                case 2:
                    console.log('Oh no! No no no no no no!')
                    break
                default:
                    console.log('Good night! It is enough time coding today!')
            }
            return getMovieCastByMovieId(input)
        } else return new APIError({status: 400, message: 'Server is busy. Please try again!'})
    }
}

module.exports = {
    getAllMovieCast,
    getMovieCastByMovieId,
}
