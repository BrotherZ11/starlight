import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import FilterSearchBar from "../components/FilterSearchBar";
import BotonesJuegos from "../components/BotonesJuegos";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-dark pb-5" style={{ minHeight: "calc(100vh - 64px)" }}>
        <FilterSearchBar />
        <hr className="border-danger" />
        <div className="container-fluid mb-4">
          <Carousel />
        </div>
        <div className="border-top border-danger text-danger pl-3 pt-3 ms-3">
          <p style={{ fontSize: "2rem", color: "red"}}>Juegos</p>
        </div>
        <BotonesJuegos />
      </div>
      <Footer />
    </>
  );
}

export default Home;
