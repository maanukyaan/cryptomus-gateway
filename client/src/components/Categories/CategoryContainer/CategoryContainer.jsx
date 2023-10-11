import { React, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./styles/CategoryContainer.module.css";
import Product from "./../../Category/Product/Product";
import ProductsContainer from "./../../Category/ProductsContainer/ProductsContainer";

import facebookAccounts from "../../../img/Product/facebook_accounts.svg";
import businessManager from "../../../img/Categories/business_manager.svg";
import fanPages from "../../../img/Categories/fan_pages.svg";

import Loader from "../../Loader/Loader";

export default function CategoryContainer() {
  const { categoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  const fetchData = async (link) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/api/getCategories/${link}`
      );
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
        {categoryData !== null ? (
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
