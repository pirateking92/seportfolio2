// app/providers/ApolloProvider.tsx

"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../../../apollo-client";

const CustomApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default CustomApolloProvider;
