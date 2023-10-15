import React, { useState } from "react";
import { Twirl as Hamburger } from "hamburger-react";

import styles from "./styles/Nav.module.css";

import logo from "../../img/Nav/logo.svg";

export default function Nav() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.Nav}>
      <nav className={styles.nav}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <ul className={`${styles.ul} ${isMenuOpen ? styles.open : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Categories</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
        <button className={styles.button}>EN</button>
        {windowWidth < 951 && (
          <Hamburger
            rounded
            color="#fff"
            toggled={isMenuOpen}
            toggle={setIsMenuOpen}
          />
        )}
      </nav>
    </div>
  );
}
