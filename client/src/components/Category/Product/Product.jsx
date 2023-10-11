import styles from "./styles/Product.module.css";

import { NavLink } from "react-router-dom";

function Product(props) {
  return (
    <div className={styles.Product}>
      <div className={styles.ProductContainer}>
        {props.color === "gold" ? (
          <h2
            className={styles.title}
            style={{
              color: `${props.color}`,
            }}
          >
            {props.title}
          </h2>
        ) : (
          <h2 className={styles.title}>{props.title}</h2>
        )}
        <p className={styles.description}>{props.description}</p>
        <img src={props.img} alt="Icon" className={styles.img} />
      </div>
      <NavLink
        to={`${window.location.href}/${props.link}`}
        className={styles.a}
      >
        MORE
      </NavLink>
    </div>
  );
}

export default Product;
