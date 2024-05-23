import React from "react";
import Navbar from "../components/Navbar";
import ShopOpciones from "../components/ShopOpciones";
import Footer from "../components/Footer";

function Shop() {
  return (
    <>
      <div style={{ backgroundColor: "#282828", minHeight: "100vh" }}>
        <Navbar />
        <div>
          <div className="mt-5 mb-2">
            <ShopOpciones />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
