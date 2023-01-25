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

  type Query {
    users: [User]
  }

  input UserInput {
    username: String
    email: String!
    role: String
    phoneNumber: String
    password: String!
    address: String
  }

  type Mutation {
    registerUser(registerUserInput: UserInput): String
    editUser(editUserInput: UserInput, id: ID): String
    deleteUser(id: ID): String
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const usersCache = await redis.get("usersCacheOrchestrator");
        if(usersCache){
          console.log("cache");
          return JSON.parse(usersCache);
        }
        const { data } = await axios({
          method: "GET",
          url: `${userUrl}users`
        });
        await redis.set("usersCacheOrchestrator", JSON.stringify(data));
        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    }
  },
  Mutation: {
    registerUser: async (_, args) =>{
      try {
        const {username, email, role, phoneNumber, password, address} = args.registerUserInput;
        const {data} = await axios({
          method: "POST",
          url: `${userUrl}users`,
          data: {username, email, role, phoneNumber, password, address}
        });
        await redis.del("usersCacheOrchestrator");
        return data.message;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
    editUser: async (_, args) =>{
      try {
        const {username, email, role, phoneNumber, password, address} = args.editUserInput;
        const {id} = args;
        const {data} = await axios({
          method: "PUT",
          url: `${userUrl}users/${id}`,
          data: {username, email, role, phoneNumber, password, address}
        })
        await redis.del("usersCacheOrchestrator");
        return data.message;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
    deleteUser: async (_, args) =>{
      try {
        const {id} = args;
        const {data} = await axios({
          method: "DELETE",
          url: `${userUrl}users/${id}`
        });
        await axios({
          method: "DELETE",
          url: `${productsUrl}admins/products/users/${id}`
        })
        await redis.del("usersCacheOrchestrator");
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

module.exports = {typeDefs, resolvers};