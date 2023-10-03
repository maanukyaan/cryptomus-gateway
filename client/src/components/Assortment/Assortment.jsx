import CategoryHeader from "../Category/CategoryHeader/CategoryHeader";
import ProductsContainer from "../Category/ProductsContainer/ProductsContainer";
import Product from "../Category/Product/Product";

import facebookAccounts from "../../img/CategoryHeader/facebook_accounts.svg";
import businessManager from "../../img/CategoryHeader/business_manager.svg";
import fanPages from "../../img/CategoryHeader/fan_pages.svg";

import facebookAccountsProduct from "../../img/Product/facebook_accounts.svg";
import businessManagerProduct from "../../img/Product/business_manager.svg";
import fanPagesProduct from "../../img/Product/fan_pages.svg";

function Assortment() {
  return (
    <>
      <CategoryHeader title={"Facebook Accounts"} img={facebookAccounts} />
      <ProductsContainer>
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={facebookAccountsProduct}
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={facebookAccountsProduct}
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={fanPagesProduct}
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={businessManagerProduct}
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={businessManagerProduct}
          color="gold"
          link="/gold"
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={facebookAccountsProduct}
        />
      </ProductsContainer>
      <CategoryHeader title={"Business Manager"} img={businessManager} />
      <ProductsContainer>
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={facebookAccountsProduct}
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={facebookAccountsProduct}
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={fanPagesProduct}
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={businessManagerProduct}
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={businessManagerProduct}
          color="gold"
          link="/gold"
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={facebookAccountsProduct}
        />
      </ProductsContainer>
      <CategoryHeader title={"Fan pages"} img={fanPages} />
      <ProductsContainer>
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={facebookAccountsProduct}
          color="gold"
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={facebookAccountsProduct}
          color="gold"
        />
        <Product
          title="REINSTATE ACCOUNTS (ARI-2LINE)"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          img={fanPagesProduct}
          color="gold"
        />
      </ProductsContainer>
    </>
  );
}

export default Assortment;
