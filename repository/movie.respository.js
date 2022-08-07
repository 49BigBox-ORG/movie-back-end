const {PrismaClient} = require('@prisma/client')
const {decodeToken} = require('../helper/jwt.helper')
const prisma = new PrismaClient()

const getAllMovie = async () => {
    try {
        const data = await prisma.movie.findMany({
            include: {
                movieType: true,
                movieStatus: true,
            },
        })

        const response = data.map((item) => {
            return {
                ...item,
                type: item.movieType.type,
                status: item.movieStatus.status,
            }
        })

        return response
    } catch (e) {
        console.log(e)
    }
}

const getDetailMovie = async (input, accessToken) => {
    let isPurchased = null
    const decoded = decodeToken(accessToken)
    try {
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
            const purchaseData = await prisma.purchasedMovie.findMany({
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

        const response = {
            ...movieData,
            type: movieData.movieType.type,
            status: movieData.movieStatus.status,
            category: categoryData,
            isPurchased,
        }

        return response
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getAllMovie,
    getDetailMovie,
}
