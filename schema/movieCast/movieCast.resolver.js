const {getAllMovieCast, getMovieCastByMovieId} = require('../../repository/movieCast.repository')

const movieCastResolver = {
    Query: {
        movieCast: () => {
            return getAllMovieCast()
        },
    },
    Mutation: {
        getMovieCastByMovieId: (parent, {input}) => {
            return getMovieCastByMovieId(input)
        },
    },
}

module.exports = movieCastResolver
