import styles from "./styles/ProductsContainer.module.css"

function ProductsContainer( props ) {
  return (
    <div className={styles.ProductsContainer}>
      {props.children}
    </div>
  )
}

export default ProductsContainer