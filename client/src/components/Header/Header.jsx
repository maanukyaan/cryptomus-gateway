import style from "./styles/Header.module.css";

import facebook from "../../img/Header/facebook.svg";

function Header() {
  return (
    <div className={style.Header}>
      <div className={style.left}>
        <h2 className={style.h2}>
          Manually created <br />
          <span className={style.yellow}> Facebook Ads Accounts </span> <br />
          for your needs
        </h2>
        <h3 className={style.h3}>
          Are you looking for a Facebook Ads account to run your campaigns on
          Facebook? We can provide you a fully working Facebook Ads Account,
          Business Manager and Fan Page.
        </h3>
      </div>
      <div className={style.right}>
        <img src={facebook} className={style.img} alt="Facebook" />
      </div>
    </div>
  );
}

export default Header;
