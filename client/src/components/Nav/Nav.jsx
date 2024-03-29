import React, { useState } from "react";
import { Twirl as Hamburger } from "hamburger-react";

import styles from "./styles/Nav.module.css";

export default function Nav() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  return (
    <div className={styles.Nav}>
      <nav className={styles.nav}>
        {/* <img src={logo} alt="Logo" className={styles.logo} /> */}
        <div className={styles.logo}>ACCSPALACE</div>
        <ul className={`${styles.ul} ${isMenuOpen ? styles.open : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/#content">Categories</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <button className={styles.button}>EN</button>
        {windowWidth < 951 && (
          <Hamburger
            rounded
            color="#fff"
            toggled={isMenuOpen}
            toggle={toggleMenu}
          />
        )}
      </nav>
    </div>
  );
}
