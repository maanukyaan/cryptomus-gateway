import style from "./CategoryHeader.module.css";

function CategoryHeader(props) {
  return (
    <div className={style.CategoryHeader_container}>
      <div className={style.CategoryHeader}>
        <img
          src={props.img}
          className={style.facebookIcon}
          alt="Facebook icon"
        />
        <h2 className={style.h2}>{props.title}</h2>
      </div>
    </div>
  );
}

export default CategoryHeader;
