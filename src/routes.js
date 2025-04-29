import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Layout from "./Layout";
import Search from "./pages/search/Search";
import Share from "./pages/share/Share";
import Contact from "./pages/contact/Contact";



const AppRoutes = () => {
  return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/product/:id/share" element={<Share />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Layout>
    </Router>
  );
};

export default AppRoutes;
