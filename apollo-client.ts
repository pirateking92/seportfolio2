import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://cms.sepybaghaei.co.uk/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;
