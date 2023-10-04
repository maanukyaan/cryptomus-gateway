import styles from "./PaymentMethods.module.css";

import bell from "../../img/PaymentMethods/bell.svg";
import visa_mastercard from "../../img/PaymentMethods/visa_mastercard.svg";
import wise from "../../img/PaymentMethods/wise.svg";
import bitcoin from "../../img/PaymentMethods/bitcoin.svg";
import usdt from "../../img/PaymentMethods/usdt.svg";

function PaymentMethods() {
  return (
    <div className={styles.PaymentMethodsContainer}>
      <div className={styles.PaymentMethods}>
        <div className={styles.left}>
          <img src={bell} alt="bell" />
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>Contact us to pay using this payment methods</h3>
          <div className={styles.methods}>
            <img className={styles.img} src={visa_mastercard} alt="visa_mastercard" />
            <img className={styles.img} src={wise} alt="wise" />
            <img className={styles.img} src={bitcoin} alt="bitcoin" />
            <img className={styles.img} src={usdt} alt="usdt" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethods;
