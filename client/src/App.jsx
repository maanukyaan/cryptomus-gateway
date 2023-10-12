import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Categories from "./components/Categories/Categories";
import Assortment from "./components/Assortment/Assortment";
import CategoryContainer from "./components/Categories/CategoryContainer/CategoryContainer";
import SubcategoryContainer from "./components/Categories/SubcategoryContainer/SubcategoryContainer";
import ProductDetails from "./components/Category/Product/ProductDetails/ProductDetails";

function App() {
  return (
    <>
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
          <Route path="/assortment" element={<Assortment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
