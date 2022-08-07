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

module.exports = {
    getAllMovie,
}
