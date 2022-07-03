import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache();
// 클라이언트 브라우저 메모리에 GraphQL 요청-응답을 캐싱하는 공간