import styles from "../Product/styles/Product.module.css"

function ProductsContainer( props ) {
  return (
    <div className={styles.ProductsContainer}>

    <h2 className={styles.main_title}>Select subcategory:</h2>
    <div>

      {props.children}
    </div>
    </div>
  )
}

export default ProductsContainer