import fetch from 'cross-fetch';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink
} from "@apollo/client";

const instance = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://graphql-pokeapi.vercel.app/api/graphql', fetch })
});

export default instance;