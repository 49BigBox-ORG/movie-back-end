const {getMovieCastByMovieId} = require('../../repository/movieCast.repository')

const movieCastResolver = {
    Mutation: {
        getMovieCastByMovieId: (parent, {input}) => {
            return getMovieCastByMovieId(input)
        },
    },
}

module.exports = movieCastResolver
