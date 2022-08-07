const {getAllMovie} = require('../../repository/movie.respository')

const movieResolver = {
    Query: {
        movie: () => {
            return getAllMovie()
        },
    },
}

module.exports = movieResolver
