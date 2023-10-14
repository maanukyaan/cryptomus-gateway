import React from "react";

import styles from "./styles/ProductDetails.module.css";

function ProductHeader({ title }) {
  return (
    <div className={styles.ProductHeader}>
      <div className={styles.ProductHeader_title}>{title}</div>
    </div>
  );
}

export default ProductHeader;
