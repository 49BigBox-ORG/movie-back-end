const {getAllMovie, getDetailMovie, getSourceMovie, getAllMovieAdmin} = require('../../repository/movie.respository')

const movieResolver = {
    Query: {
        movie: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getAllMovie(accessToken)
        },
        getAllMovieAdmin: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getAllMovieAdmin(accessToken)
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
