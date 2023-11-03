import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Categories from "./components/Categories/Categories";
import CategoryContainer from "./components/Categories/CategoryContainer/CategoryContainer";
import SubcategoryContainer from "./components/Categories/SubcategoryContainer/SubcategoryContainer";
import ProductDetails from "./components/Products/Product/ProductDetails/ProductDetails";
import Buy from "./components/Buy/Buy";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <div className="App">
      <div>
        <Toaster />
      </div>

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Categories />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryContainer />}
          />
          <Route
            path="/category/:categoryName/:subcategoryName"
            element={<SubcategoryContainer />}
          />
          <Route
            path="/category/:categoryName/:subcategoryName/details"
            element={<ProductDetails />}
          />
        </Route>

        <Route path="/buy/:categoryName/:subcategoryName" element={<Buy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
