import { Outlet } from "react-router-dom";

import Nav from "./../Nav/Nav";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import PaymentMethods from "../PaymentMethods/PaymentMethods";
import Socials from "../Social/Socials/Socials";
import WhyWe from "../WhyWe/WhyWe";
import FAQ from "../FAQ/FAQ";
import Contact from "../Contact/Contact";

function Layout() {
  return (
    <>
      <Nav />
      <Header />

      {/* <div id="content">
        <ScrollToTop />
        <Outlet />
      </div> */}

      <Outlet />

      <PaymentMethods />
      <Socials />
      <WhyWe />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

export default Layout;
