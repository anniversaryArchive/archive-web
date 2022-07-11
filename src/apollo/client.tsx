import { ApolloClient, createHttpLink } from '@apollo/client';
import { cache } from '../apollo/cache';

const REACT_APP_URL = process.env.REACT_APP_URL;

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_URL}/graphql`
});

export const client = new ApolloClient({
  link: httpLink,
  cache: cache,
});