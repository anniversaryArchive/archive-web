import React from "react";
import "./App.css";

import { ApolloProvider } from "@apollo/client";
import { client } from '../src/apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
    </ApolloProvider>
  );
}

export default App;