if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const productSchema = require('./schemas/productSchema');
const userSchema = require('./schemas/userSchema');
const categorySchema = require('./schemas/categorySchema');


const server = new ApolloServer({
  typeDefs: [productSchema.typeDefs, userSchema.typeDefs, categorySchema.typeDefs],
  resolvers: [productSchema.resolvers, userSchema.resolvers, categorySchema.resolvers],
  introspection: true
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
})
  .then(({url})=>{
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch(err=>{
    console.log(err);
  })
