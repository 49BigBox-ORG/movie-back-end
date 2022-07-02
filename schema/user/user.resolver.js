

const userResolver = {
    Query: {
        posts: () => {
            return getAllUser()
        }
    },
    Mutation: {
        insertPost: (parent, {input}, context, info) => {
            return insertPost(input.author_id, input.title, input.published)
        }
    }
}

module.exports = postsResolver;
