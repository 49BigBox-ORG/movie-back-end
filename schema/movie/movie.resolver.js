const {getAllMovie, getDetailMovie} = require('../../repository/movie.respository')

const movieResolver = {
    Query: {
        movie: () => {
            return getAllMovie()
        },
    },
    Mutation: {
        getDetailMovie: (parent, {input}) => {
            return getDetailMovie(input)
        },
    },
}

module.exports = movieResolver
