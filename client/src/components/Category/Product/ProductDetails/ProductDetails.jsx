import React from "react";
import { useLocation } from "react-router-dom";

import styles from "./styles/ProductDetails.module.css";
import ProductHeader from "./ProductHeader";

import img_1 from "../../../../img/ProductDetails/img_1.png";
import img_2 from "../../../../img/ProductDetails/img_2.png";

function StringToList({ data }) {
  // Заменяем все дефисы "-" на пустую строку
  data = data.replace(/-/g, "");

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

function ProductDetails() {
  const location = useLocation();
  const { state } = location;

  return (
    <div className={styles.ProductDetails}>
      <ProductHeader title={state.title} />
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.img_container}>
            <img src={img_1} alt="Facebook" />
            <img src={img_2} alt="Facebook" />
          </div>
          <div className={styles.features_container}>
            <h3 className={styles.features_title}>Features</h3>
            <StringToList data={state.description} />
          </div>
        </div>
        <div className={styles.right}>
          <h2 className={styles.title}>{state.title}</h2>
          <StringToList data={state.card_description} />
          <span className={styles.price}>${state.price}</span>
          <span className={styles.stock}>Stock: {state.stock}</span>

          <h4 className={styles.contact}>Contact sales team</h4>
          <div className={styles.link_container}>
            <a href="/" className={styles.link}>
              WhatsApp
            </a>
            <a
              href="/"
              className={styles.link}
              style={{
                marginLeft: 20,
              }}
            >
              Telegram
            </a>
          </div>
          <a
            className={styles.link}
            href={state.buy_link}
            style={{
              width: 500,
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            Buy now
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
