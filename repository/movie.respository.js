const {PrismaClient} = require('@prisma/client')
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

const getDetailMovie = async (input) => {
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
