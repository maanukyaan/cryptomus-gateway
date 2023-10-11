import React from "react";

function ManukyanWeb() {
  return (
    <>
      <section
        className="manukyan-web"
        style={{
          width: "100%",
          background: "#303030",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <a href="https://manukyanweb.ru" target="_blank" rel="noreferrer">
          <img
            src="https://raw.githubusercontent.com/kenshi244/mw-ad/master/manukyan_web_logo.png"
            alt="Manukyan web Logo"
            style={{
              height: 70,
              transition: "0.2s all ease",

              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </a>
      </section>
    </>
  );
}

export default ManukyanWeb;
