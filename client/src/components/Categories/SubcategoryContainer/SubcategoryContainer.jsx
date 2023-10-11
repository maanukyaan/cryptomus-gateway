import { React, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  const baseUrl = "http://localhost:5555/api/getSubcategories"; // Базовый URL для запросов к бэкенду
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
  return (
    <div className={styles.SubcategoryContainer}>
      {categoryData !== null ? (
        categoryData.map((category) => (
          <div key={category._id} className={styles.SubcategoryItem}>
            <div className={styles.left}>
              <img src={facebook_img} alt="Facebook" className={styles.img} />
              <h3 className={styles.price}>${category.price}</h3>
            </div>
            <div className={styles.right}>
              <h2 className={styles.title}>{category.name}</h2>
              <StringToList data={category.card_description} />
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SubcategoryContainer;
