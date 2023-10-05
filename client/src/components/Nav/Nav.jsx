import styles from "./styles/Nav.module.css";

import logo from "../../img/Nav/logo.svg";

export default function Nav() {
  return (
    <div className={styles.Nav}>
      <nav className={styles.nav}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <ul className={styles.ul}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Categories</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <button className={styles.button}>EN</button>
      </nav>
    </div>
  );
}
