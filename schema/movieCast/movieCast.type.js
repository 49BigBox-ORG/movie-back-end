const gql = require('graphql-tag')

const typeDefs = gql`
    type MovieCast {
        movieId: Int
        actorId: Int
    }

    type Query {
        movieCast: [GetAllMovieCastOutPut]
    }

    type Mutation {
        getMovieCastByMovieId(input: getMovieCastByMovieIdInput): GetMovieCastByMovieIdOutput
    }

    type GetAllMovieCastOutPut {
        movieId: Int
        actor: [Actor]
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
