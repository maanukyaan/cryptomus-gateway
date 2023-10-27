import styles from "../Product/styles/Product.module.css"

function ProductsContainer( props ) {
  return (
    <div className={styles.ProductsContainer}>
      {props.children}
    </div>
  )
}

export default ProductsContainer