import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ScrollToTop() {
  const navigate = useNavigate();

  useEffect(() => {
    return navigate((location) => {
      // Идентификатор элемента, к которому вы хотите прокрутить страницу
      const element = document.getElementById("content");

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }

      return location;
    });
  }, [navigate]);

  return null;
}

export default ScrollToTop;
