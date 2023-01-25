import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://sporty-orchestrator.foxhub.space/',
  cache: new InMemoryCache(),
});

export default client;