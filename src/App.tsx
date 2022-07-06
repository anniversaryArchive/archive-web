import React from "react";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { client } from "../src/apollo/client";
import Layout from "./components/layout";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Layout>
          <Router>
            <Routes>
              <Route path="/" />
            </Routes>
          </Router>
        </Layout>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
