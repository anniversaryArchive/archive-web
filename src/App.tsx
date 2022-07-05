import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from '../src/apollo/client';
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
    </ApolloProvider>
  );
}

export default App;