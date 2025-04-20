import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Layout from "./Layout";
import Products from "./pages/Products/Products";



const AppRoutes = () => {
  return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/:query" element={<Products />} />
            </Routes>
        </Layout>
    </Router>
  );
};

export default AppRoutes;
