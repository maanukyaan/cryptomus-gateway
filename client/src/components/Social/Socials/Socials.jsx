import styles from "./styles/Socials.module.css";

import SocialItem from "../SocialItem/SocialItem";

import whatsapp from "../../../img/SocialItem/whatsapp.svg";
import telegram from "../../../img/SocialItem/telegram.svg";
import telegramChannel from "../../../img/SocialItem/telegram_channel.svg";

function Socials() {
  return (
    <div className={styles.Socials}>
      <SocialItem img={whatsapp} title="WhatsApp Support" />
      <SocialItem img={telegram} title="Telegram Support" />
      <SocialItem img={telegramChannel} title="Telegram Channel" />
    </div>
  )
}

export default Socials