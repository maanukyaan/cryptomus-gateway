import React from "react";
import styles from "./styles/AccordeonItem.module.css";

import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";

function AccordeonItem({ title, text, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index;

  const handleClick = () => {
    if (isOpen) {
      // Если элемент уже открыт, закрываем его
      setOpenIndex(null);
    } else {
      // В противном случае открываем элемент
      setOpenIndex(index);
    }
  };

  return (
    <div
      className={`${styles.accordeon_item} ${isOpen ? styles.open : ""}`}
      onClick={handleClick}
    >
      <div className={styles.left}>
        <h3 className={styles.title}>{title}</h3>
        {isOpen && <p className={styles.text}>{text}</p>}
      </div>
      <div className={styles.right}>
        {isOpen ? (
          <RemoveOutlinedIcon style={{ fontSize: 70 }} />
        ) : (
          <AddIcon style={{ fontSize: 70 }} />
        )}
      </div>
    </div>
  );
}

export default AccordeonItem;
