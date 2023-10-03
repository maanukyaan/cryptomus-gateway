import style from "./ProductsContainer.module.css"

function ProductsContainer( props ) {
  return (
    <div className={style.ProductsContainer}>
      {props.children}
    </div>
  )
}

export default ProductsContainer