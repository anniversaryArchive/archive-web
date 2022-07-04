import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { cache } from '../apollo/cache';

const httpLink = createHttpLink({
    uri: "", // 추가 예정
});

export const client = new ApolloClient({
    link: httpLink,
    cache: cache,
});