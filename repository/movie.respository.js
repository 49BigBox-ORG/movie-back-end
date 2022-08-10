const {PrismaClient} = require('@prisma/client')
const {decodeToken} = require('../helper/jwt.helper')
const prisma = new PrismaClient()
const APIError = require('../helper/api.helper')

const getAllMovie = async () => {
    try {
        const data = await prisma.movie.findMany({
            include: {
                movieType: true,
                movieStatus: true,
            },
        })

        return data.map((item) => {
            return {
                ...item,
                type: item.movieType.type,
                status: item.movieStatus.status,
            }
        })
    } catch (e) {
        console.log(e)
    }
}

const getDetailMovie = async (input, accessToken) => {
    let isPurchased = null
    const decoded = decodeToken(accessToken)
    try {
        if (accessToken) {
            if (!decoded.status) {
                return new APIError({status: 401, message: decoded.message})
            }
        }
        const movieData = await prisma.movie.findUnique({
            where: {
                id: input.id,
            },
            include: {
                movieType: true,
                movieStatus: true,
            },
        })

        const categoryToMovieData = await prisma.categoryToMovie.findMany({
            where: {
                movieId: input.id,
            },
            include: {
                category: true,
            },
        })

        if (decoded.status) {
            const purchaseData = await prisma.purchasedMovie.findFirst({
                where: {
                    userId: decoded.data.userId,
                    movieId: input.id,
                },
            })
            isPurchased = purchaseData !== null
        }

        const categoryData = categoryToMovieData.map((item) => {
            return {
                ...item.category,
            }
        })

        const actorData = await prisma.movieCast.findMany({
            where: {
                movieId: input.id,
            },
            include: {
                actor: true,
            },
        })

        const actor = actorData.map((item) => {
            return {
                ...item.actor,
            }
        })

        return {
            ...movieData,
            type: movieData.movieType.type,
            status: movieData.movieStatus.status,
            category: categoryData,
            isPurchased,
            actor: actor,
        }
    } catch (e) {
        console.log(e)
        return e
    }
}

const getSourceMovie = async (input, accessToken) => {
    let isPurchased = null
    const decoded = decodeToken(accessToken)
    try {
        if (decoded.status) {
            const purchaseData = await prisma.purchasedMovie.findFirst({
                where: {
                    userId: decoded.data.userId,
                    movieId: input.id,
                },
            })
            isPurchased = purchaseData !== null
        } else {
            throw new APIError({status: 401, message: decoded.message})
        }

        if (isPurchased) {
            const movieSourceData = await prisma.movieSource.findMany({
                where: {
                    movieId: input.id,
                },
            })

            const movieData = await prisma.movie.findUnique({
                where: {
                    id: input.id,
                },
            })
            console.log(movieSourceData)
            return {
                ...movieData,
                movieSource: movieSourceData,
                isPurchased,
            }
        } else {
            throw new APIError({status: 404, message: 'You need to purchase this movie!'})
        }
    } catch (e) {
        return new APIError(e)
    }
}

module.exports = {
    getAllMovie,
    getDetailMovie,
    getSourceMovie,
}
