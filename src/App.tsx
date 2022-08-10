import React from "react";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { client } from "../src/apollo/client";
import Layout from "./components/layout";
import SelectGroupList from "./pages/SelectGroup";
import SearchCafe from "./pages/SearchCafe";
import KaKaoMap from "./pages/KakaoMap";
import CreateArchive from "./pages/CreateArchive"

import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<SelectGroupList />} />
              <Route path="/searchCafe" element={<SearchCafe />} />
              <Route path="/cafe" element={<KaKaoMap />} />
              <Route path="/createArchive" element={<CreateArchive />} />
            </Routes>
          </Router>
        </Layout>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
