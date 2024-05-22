import React from "react";
import Navbar from "../components/Navbar";
import ShopOpciones from "../components/ShopOpciones";

function Shop() {
  return (
    <>
      <div style={{ backgroundColor: "#282828", minHeight: "100vh" }}>
      <Navbar />
      <div>
        <div className="mt-5">
          <ShopOpciones />
        </div>
      </div>
    </div>
   
    </>
  );
}

export default Shop;
