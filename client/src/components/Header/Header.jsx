import style from "./styles/Header.module.css"

import facebook from "../../img/Header/facebook.svg";

function Header() {
  return (
    <div className={style.Header}>
      <div className={style.left}>
        <h2 className={style.h2}>
          Buy <span className={style.yellow}>FACEBOOK ADS</span> Accounts and 
          <span className={style.yellow}> BUSINESS MANAGERS</span> to facilitate your
          advertising efforts!
        </h2>
        <h3 className={style.h3}>
          We offer the ultimate destination for acquiring Facebook Ads Accounts
          and Business Managers, backed by a 100% guarantee for successful
          advertising.
        </h3>
      </div>
      <div className={style.right}>
        <img src={facebook} className={style.img} alt="Facebook" />
      </div>
    </div>
  );
}

export default Header;
