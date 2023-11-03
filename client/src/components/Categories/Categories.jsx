import styles from "./styles/Categories.module.css";

import CategoryItem from "./CategoryItem/CategoryItem";

import facebookAccounts from "../../img/Categories/facebook_accounts.svg";
import businessManager from "../../img/Categories/business_manager.svg";
import fanPages from "../../img/Categories/fan_pages.svg";

function Categories() {
  return (
    <div className={styles.Categories}>
      <h2 className={styles.title}>Select category:</h2>
      <div className={styles.container}>
        <CategoryItem
          title="Facebook Accounts"
          img={facebookAccounts}
          link="category/facebook_accounts"
        />
        <CategoryItem
          title="Business Manager"
          img={businessManager}
          link="category/business_manager"
        />
        <CategoryItem
          title="Fan Pages"
          img={fanPages}
          link="category/fan_pages"
        />
      </div>
    </div>
  );
}

export default Categories;
