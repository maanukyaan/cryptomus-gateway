import React from "react";

import styles from "./styles/ProductDetails.module.css";

function ProductHeader({ title }) {
  return (
    <div className={styles.ProductHeader}>
      <h2 className={styles.ProductHeader_title}>{title}</h2>
    </div>
  );
}

export default ProductHeader;
