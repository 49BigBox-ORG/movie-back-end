const {getAllMovie, getDetailMovie, getSourceMovie} = require('../../repository/movie.respository')

const movieResolver = {
    Query: {
        movie: () => {
            return getAllMovie()
        },
    },
    Mutation: {
        getDetailMovie: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getDetailMovie(input, accessToken)
        },
        getSourceMovie: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getSourceMovie(input, accessToken)
        },
    },
}

module.exports = movieResolver
