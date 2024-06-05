import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import BotonesJuegos from "../components/BotonesJuegos";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Navbar />
      <div className="bg-dark pb-5" style={{ minHeight: "calc(100vh - 64px)" }}>
        <div className="container-fluid mb-4">
          <Carousel />
        </div>
        <div className="border-top border-danger text-danger pl-3 pt-3 ms-3">
          <h2 style={{ fontSize: "2rem", color: "red", fontFamily:"Montserrat"}}>Juegos</h2>
        </div>
        <BotonesJuegos />
      </div>
      <Footer />
    </>
  );
}

export default Home;
