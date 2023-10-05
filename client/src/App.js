import Assortment from "./components/Assortment/Assortment";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import PaymentMethods from "./components/PaymentMethods/PaymentMethods";
import Socials from "./components/Social/Socials/Socials";
import WhyWe from "./components/WhyWe/WhyWe";
import FAQ from "./components/FAQ/FAQ";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Nav />
      <Header />
      <Assortment />
      <PaymentMethods />
      <Socials />
      <WhyWe />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
