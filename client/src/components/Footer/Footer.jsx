import styles from "./styles/Footer.module.css";

import logo from "../../img/Footer/logo.svg";

import telegram_icon from "../../img/Footer/telegram_icon.svg";
import whatsapp_icon from "../../img/Footer/whatsapp_icon.svg";
import facebook_icon from "../../img/Footer/facebook_icon.svg";
import youtube_icon from "../../img/Footer/youtube_icon.svg";

function Footer() {
  return (
    <div className={styles.Footer}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={logo} />
        <div className={styles.iconsContainer}>
          <a href="/" className={styles.a}>
            <img src={telegram_icon} alt="Icon" className={styles.icon} />
          </a>
          <a href="/" className={styles.a}>
            <img src={whatsapp_icon} alt="Icon" className={styles.icon} />
          </a>
          <a href="/" className={styles.a}>
            <img src={facebook_icon} alt="Icon" className={styles.icon} />
          </a>
          <a href="/" className={styles.a}>
            <img src={youtube_icon} alt="Icon" className={styles.icon} />
          </a>
        </div>
      </div>
      <div className={styles.right}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
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
        </nav>
        <p className={styles.p}>Copyright © 2023 VALGO.SHOP</p>
      </div>
    </div>
  );
}

export default Footer;
