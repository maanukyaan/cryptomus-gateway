import styles from "./styles/Product.module.css";

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
      <a href={props.link} className={styles.a}>
        MORE
      </a>
    </div>
  );
}

export default Product;
