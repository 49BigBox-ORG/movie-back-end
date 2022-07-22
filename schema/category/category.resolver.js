const {getAllCategory} = require('../../repository/category.repository')
const categoryResolver = {
    Query: {
        category: () => {
            return getAllCategory()
        },
    },
}

module.exports = categoryResolver
