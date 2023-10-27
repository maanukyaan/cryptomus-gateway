import { React, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./styles/CategoryContainer.module.css";
import Product from "./../../Products/Product/Product";
import ProductsContainer from "./../../Products/ProductsContainer/ProductsContainer";

import facebookAccounts from "../../../img/Product/facebook_accounts.svg";

import Loader from "../../Loader/Loader";

export default function CategoryContainer() {
  const { categoryName } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async (link) => {
    try {
      let serverLink =
        "https://www.main-bvxea6i-ij5pctw5a4zt4.us-3.platformsh.site";
      // serverLink = "http://localhost:5000";

      const response = await axios.get(
        `${serverLink}/api/getCategories/${link}`
      );
      console.log(response.data);
      setCategoryData(response.data);
    } catch (error) {
      console.error("Ошибка при запросе на бэкенд", error);
    }
  };

  useEffect(() => {
    fetchData(categoryName);
  }, [categoryName]);

  return (
    <div className={styles.CategoryContainer}>
      <ProductsContainer>
        {categoryData.length > 0 ? (
          categoryData.map((category) => (
            <Product
              key={category._id}
              title={category.title}
              description={category.description}
              img={facebookAccounts}
              link={category.nameInDB}
            />
          ))
        ) : (
          <Loader />
        )}
      </ProductsContainer>
    </div>
  );
}
