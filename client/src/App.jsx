import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Categories from "./components/Categories/Categories";
import Assortment from "./components/Assortment/Assortment";

function App() {
  return (
    <>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Categories />} />
          <Route path="/assortment" element={<Assortment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
