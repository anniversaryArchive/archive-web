import { ApolloClient, createHttpLink } from '@apollo/client';
import { cache } from '../apollo/cache';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`
});

export const client = new ApolloClient({
  link: httpLink,
  cache: cache,
});