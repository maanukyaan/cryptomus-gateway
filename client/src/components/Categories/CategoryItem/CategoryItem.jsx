

import styles from "./styles/CategoryItem.module.css";
import { NavLink } from "react-router-dom";

function CategoryItem({ link, title, img }) {

  return (
    <NavLink to={link} className={styles.CategoryItem} >
      <img src={img} alt="Icon" className={styles.img} />
      <h2 className={styles.title}>{title}</h2>
    </NavLink>
  );
}

export default CategoryItem;
