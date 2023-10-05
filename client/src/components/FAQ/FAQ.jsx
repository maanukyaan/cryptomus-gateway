import React, { useState } from "react";
import styles from "./styles/FAQ.module.css";
import AccordeonItem from "./AccordeonItem/AccordeonItem";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={styles.FAQ}>
      <h2 className={styles.title}>FAQ</h2>
      <div className={styles.accordeon_container}>
        <AccordeonItem
          title="How to place an order?"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          index={0}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
        <AccordeonItem
          title="When will I receive the order?"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          index={1}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
        <AccordeonItem
          title="What is the warranty on the accounts?"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          index={2}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
        <AccordeonItem
          title="Will you send me a how-to-use guide?"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          index={3}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
        <AccordeonItem
          title="Can I return accounts?"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          index={4}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
      </div>
    </div>
  );
}

export default FAQ;
