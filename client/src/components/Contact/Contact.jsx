import styles from "./styles/Contact.module.css";

import facebook_1 from "../../img/Contact/facebook_1.svg";
import facebook_2 from "../../img/Contact/facebook_2.svg";

import telegram_icon from "../../img/Contact/telegram_icon.svg";
import whatsapp_icon from "../../img/Contact/whatsapp_icon.svg";
import facebook_icon from "../../img/Contact/facebook_icon.svg";
import youtube_icon from "../../img/Contact/youtube_icon.svg";

function Contact() {
  return (
    <div className={styles.Contact}>
      <h2 className={styles.title}>Contact</h2>
      <div className={styles.section_1}>
        <div className={styles.section_1__left}>
          <img src={facebook_1} alt="Facebook" className={styles.facebook_1} />
        </div>
        <div className={styles.section_1__right}>
          <h3 className={styles.section_1__h3}>
            We are open Everyday. Get updates and{" "}
            <span style={{ color: "#ECC140" }}>special offers!</span>
          </h3>
          <h4 className={styles.section_1__h4}>
            Join us to keep up to date with our news and promotions
          </h4>
        </div>
      </div>
      <div className={styles.section_2}>
        <div className={styles.section_2__left}>
          <h2 className={styles.section_2__h2}>Have some questions?</h2>
          <form action="/mail" method="POST" className={styles.form}>
            <input
              type="text"
              name="fullnameInput"
              id="fullnameInput"
              placeholder="Full Name *"
              className={styles.input}
            />
            <input
              type="email"
              name="emailInput"
              id="emailInput"
              placeholder="Your Email *"
              className={styles.input}
            />
            <textarea
              name="questionTextarea"
              id="questionTextarea"
              cols="30"
              rows="10"
              placeholder="Your Questions *"
              className={`${styles.input} ${styles.textarea}`}
            ></textarea>
            <button type="submit" className={styles.button}>
              Send
            </button>
          </form>
        </div>
        <div className={styles.section_2__right}>
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
          <img src={facebook_2} alt="Facebook" className={styles.facebook_2} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
