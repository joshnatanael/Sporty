const axios = require('axios');

const productsUrl = `http://13.214.193.151:4002/`;

const typeDefs = `#graphql

  type Category {
    id: ID
    name: String
    imgUrl: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    categories: [Category]
  }
`;

const resolvers = {
  Query: {
    categories: async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${productsUrl}customers/categories`
        });
        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    }
  }
};

module.exports = {typeDefs, resolvers};