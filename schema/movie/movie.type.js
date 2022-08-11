const gql = require('graphql-tag')

const typeDefs = gql`
    type Movie {
        id: Int
        image: String
        title: String
        director: String
        trailer: String
        description: String
        releaseDate: String
        price: Int
        type: String
        status: String
        category: [Category]
    }

    type Query {
        movie: [Movie]
        getAllMovieAdmin: [Movie]
    }

    type Mutation {
        getDetailMovie(input: GetDetailMovieInput): Movie
        getSourceMovie(input: GetSourceMovieInput): Movie
    }

    input GetDetailMovieInput {
        id: Int!
    }

    input GetSourceMovieInput {
        id: Int!
    }

    extend type Movie {
        isPurchased: Boolean
        actor: [Actor]
        movieSource: [MovieSource]
    }

    type MovieSource {
        id: Int
        movieId: Int
        detailSource: String
        source: String
    }
`

module.exports = typeDefs
