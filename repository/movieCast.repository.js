const {PrismaClient} = require('@prisma/client')
const APIError = require('../helper/api.helper')
const prisma = new PrismaClient()

let refetchCount = 0

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
    getMovieCastByMovieId,
}
