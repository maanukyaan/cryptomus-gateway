import { React, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams, useLocation } from "react-router-dom";

import styles from "./styles/SubcategoryContainer.module.css";

import facebook_img from "../../../img/Subcategory/facebook.svg";
import Loader from "../../Loader/Loader";

function StringToList({ data }) {
  // Разбиваем строку на строки, используя переводы строк
  const lines = data.split("\n");

  return (
    <ul className={styles.ul}>
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  );
}

function SubcategoryContainer() {
  const { categoryName, subcategoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  const baseUrl = "http://localhost:5000/api/getSubcategories"; // Базовый URL для запросов к бэкенду
  const fullUrl = `${baseUrl}/${categoryName}/${subcategoryName}`;

  const fetchData = async (link) => {
    try {
      const response = await axios.get(`${link}`);
      setCategoryData(response.data);
    } catch (error) {
      console.error("Ошибка при запросе на бэкенд", error);
    }
  };

  useEffect(() => {
    fetchData(fullUrl);
  }, [fullUrl]);

  const location = useLocation();
  const { state } = location;

  return (
    <div className={styles.SubcategoryContainer}>
      {categoryData !== null ? (
        categoryData.map(
          (category) =>
            category.products.length > 0 && (
              <div key={category._id} className={styles.SubcategoryItem}>
                <div className={styles.left}>
                  <img
                    src={facebook_img}
                    alt="Facebook"
                    className={styles.img}
                  />
                  <h3 className={styles.price}>${category.price}</h3>
                </div>
                <div className={styles.right}>
                  <h2 className={styles.title}>{category.name}</h2>
                  <StringToList data={category.card_description} />
                  <div className={styles.link_container}>
                    <NavLink
                      to="details"
                      state={{
                        title: category.name,
                        description: category.product_description,
                        card_description: category.card_description,
                        price: category.price,
                        stock: category.products.length,
                        buy_link: `/buy/${categoryName}/${subcategoryName}`,
                        category_title: state.category_title,
                        product_title: category.name,
                      }}
                      className={styles.link}
                    >
                      Product Detail
                    </NavLink>
                    <NavLink
                      className={styles.link}
                      to={`/buy/${categoryName}/${subcategoryName}`}
                      state={{
                        category_title: state.category_title,
                        product_title: category.name,
                        price: category.price,
                        stock: category.products.length,
                      }}
                    >
                      Buy now
                    </NavLink>
                  </div>
                </div>
              </div>
            )
        )
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SubcategoryContainer;
