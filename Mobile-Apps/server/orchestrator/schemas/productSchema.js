const axios = require('axios');
const redis = require('../helpers/redis');
const { GraphQLError } = require('graphql');

const productsUrl = `http://13.214.193.151:4002/`;
const userUrl = `http://13.214.193.151:4001/`;

const typeDefs = `#graphql

  type User {
    _id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type Category {
    id: ID
    name: String
    imgUrl: String
    createdAt: String
    updatedAt: String
  }

  type Image {
    id: ID
    productId: ID
    imgUrl: String
    createdAt: String
    updatedAt: String
  }

  type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    categoryId: ID
    authorId: ID
    idMongo: ID
    createdAt: String
    updatedAt: String
    Category: Category
    Images: [Image]
    User: User
  }

  input productInput {
    name: String
    description: String 
    price: Int
    mainImg: String
    categoryId: ID
    imgUrl: [image]
    idMongo: ID
    authorId: ID
  }

  input image {
    id: ID
    imgUrl: String
    productId: ID
  }

  type Query {
    products (categoryName: String): [Product]
    product (productSlug: String): Product
  }

  type Mutation {
    addProduct (addProductInput: productInput): Product
    editProduct (editProductInput: productInput, id:ID): String
    deleteProduct (id: ID): String
  }
`;

const resolvers = {
  Query: {
    products: async (_, args) => {
      try {
        const categoryName = args.categoryName;
        if (categoryName) {
          const { data } = await axios({
            method: "GET",
            url: `${productsUrl}customers/products?categoryName=${categoryName}`
          });
          return data;
        }
        else {
          const productsCache = await redis.get("productsCacheOrchestrator");
          if (productsCache) {
            return JSON.parse(productsCache);
          }
          const { data } = await axios({
            method: "GET",
            url: `${productsUrl}customers/products`
          });
          await redis.set("productsCacheOrchestrator", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
    product: async (_, args) => {
      try {
        const { data: product } = await axios({
          method: "GET",
          url: `${productsUrl}customers/products/${args.productSlug}`
        });
        const { data: user } = await axios({
          method: "GET",
          url: `${userUrl}users/${product.idMongo}`
        })
        product.User = user;
        return product;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    }
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        const { name, description, price, mainImg, categoryId, imgUrl, idMongo, authorId } = args.addProductInput;
        const { data } = await axios({
          method: "POST",
          url: `${productsUrl}admins/products`,
          data: { name, description, price, mainImg, categoryId, imgUrl, idMongo, authorId }
        })
        await redis.del("productsCacheOrchestrator");
        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
    editProduct: async (_, args) => {
      try {
        const { name, description, price, mainImg, categoryId, imgUrl, idMongo, authorId } = args.editProductInput;
        const { id } = args;
        const { data } = await axios({
          method: "PUT",
          url: `${productsUrl}admins/products`,
          data: { id, name, description, price, mainImg, categoryId, imgUrl, idMongo, authorId }
        })
        await redis.del("productsCacheOrchestrator");
        return data.message;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
    deleteProduct: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "DELETE",
          url: `${productsUrl}admins/products/${id}`
        })
        await redis.del("productsCacheOrchestrator");
        return data.message;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    }
  }
};

module.exports = { typeDefs, resolvers };