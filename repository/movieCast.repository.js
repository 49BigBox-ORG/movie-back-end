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
    } finally {
        await prisma.$disconnect()
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
        console.log(e)
        if (e == 'PrismaClientInitializationError') {
            console.log(true)
        }
        refetchCount++
        refetch(refetchCount, getMovieCastByMovieId, input, 400, 'Server is busy. Please try again!')
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    getAllMovieCast,
    getMovieCastByMovieId,
}
