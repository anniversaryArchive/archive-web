import { ApolloClient, createHttpLink } from '@apollo/client';
import { cache } from '../apollo/cache';

const httpLink = createHttpLink({
    uri: "https://anniversary-archive.herokuapp.com/graphql",
});

export const client = new ApolloClient({
    link: httpLink,
    cache: cache,
});