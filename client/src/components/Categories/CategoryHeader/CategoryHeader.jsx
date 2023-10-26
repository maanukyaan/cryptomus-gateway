import styles from "./styles/CategoryHeader.module.css";

function CategoryHeader(props) {
  return (
    <div className={styles.CategoryHeader_container}>
      <div className={styles.CategoryHeader}>
        <img
          src={props.img}
          className={styles.facebookIcon}
          alt="Facebook icon"
        />
        <h2 className={styles.h2}>{props.title}</h2>
      </div>
    </div>
  );
}

export default CategoryHeader;
