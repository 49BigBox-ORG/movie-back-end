const {PrismaClient} = require('@prisma/client')
const {decodeToken, verifyAdmin} = require('../helper/jwt.helper')
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
    } finally {
        await prisma.$disconnect()
    }
}

const getDetailMovie = async (input, accessToken) => {
    let isPurchased = null
    const decoded = decodeToken(accessToken)
    try {
        if (accessToken !== 'null') {
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
    } finally {
        await prisma.$disconnect()
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
    } finally {
        await prisma.$disconnect()
    }
}

const getAllMovieAdmin = async (accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            const dataMovie = await prisma.movie.findMany({
                include: {
                    movieType: true,
                    movieStatus: true,
                    movieCast: {
                        include: {
                            actor: true,
                        },
                    },
                    categoryToMovie: {
                        include: {
                            category: true,
                        },
                    },
                    movieSource: true,
                },
            })

            return dataMovie.map((itemMovie) => {
                const actor = itemMovie.movieCast
                    .map((itemMovieCast) => {
                        return {
                            name: itemMovieCast.actor.name,
                            image: itemMovieCast.actor.image,
                            id: itemMovieCast.actor.id,
                            movieId: itemMovieCast.movieId,
                        }
                    })
                    .filter((itemActor) => {
                        return itemActor.movieId === itemMovie.id
                    })

                const category = itemMovie.categoryToMovie.map((itemCategoryToMovie) => {
                    return {
                        categoryName: itemCategoryToMovie.category.categoryName,
                        movieId: itemCategoryToMovie.movieId,
                        id: itemCategoryToMovie.category.id,
                    }
                })
                return {
                    ...itemMovie,
                    actor: actor,
                    type: itemMovie.movieType.type,
                    status: itemMovie.movieStatus.status,
                    category: category,
                    movieSource: itemMovie.movieSource,
                }
            })
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        console.log(e)
        return e
    } finally {
        await prisma.$disconnect()
    }
}

const updateMovieBasic = async (input, accessToken) => {
    try {
        const {id} = input
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            return await prisma.movie.update({
                where: {id},
                data: {
                    ...input,
                    price: parseInt(input.price),
                    releaseDate: parseInt(input.releaseDate),
                },
            })
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        console.log(e)
        return e
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    getAllMovie,
    getDetailMovie,
    getSourceMovie,
    getAllMovieAdmin,
    updateMovieBasic,
}
