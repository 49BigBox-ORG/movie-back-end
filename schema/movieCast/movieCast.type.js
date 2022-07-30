const gql = require('graphql-tag')

const typeDefs = gql`
    type MovieCast {
        movieId: Int
        actorId: Int
    }

    type Mutation {
        getMovieCastByMovieId(input: getMovieCastByMovieIdInput): GetMovieCastByMovieIdOutput
    }

    input getMovieCastByMovieIdInput {
        movieId: Int!
    }

    type GetMovieCastByMovieIdOutput {
        movieId: Int
        actors: [Actor]
    }
`

module.exports = typeDefs
