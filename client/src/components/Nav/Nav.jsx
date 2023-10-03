import logo from "../../img/Nav/logo.svg";
import style from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={style.Nav}>
      <nav className={style.nav}>
        <img src={logo} alt="Logo" className={style.logo} />
        <ul className={style.ul}>
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
        <button className={style.button}>EN</button>
      </nav>
    </div>
  );
}
