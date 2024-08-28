import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://sepybaghaei.co.uk/graphql",
  cache: new InMemoryCache(),
});

export default client;
