import React from "react";
import { Link } from "react-router-dom";
import Ruleta from "../assets/RuletaBanner.png";
import Slots from "../assets/BANNER.png";

function Carousel() {
  return (
    <div className="container-fluid">
      <div
        id="carouselExampleControls"
        className="carousel slide mt-4"
        data-bs-ride="carousel"
        data-bs-interval="4000" //intervalo para que cambie imagen de 4000 millisec (4 sec)
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Ruleta} className="d-block w-100" alt="Slide Ruleta" />
            <Link to={"/ruleta"} className="stretched-link">
              <button
                className="btn btn-success btn-sm position-absolute bottom-0 start-50 translate-middle-x"
                aria-label="Ir a ruleta"
                tabIndex={0}
              >
                JUEGA AHORA
              </button>
            </Link>
          </div>
          <div className="carousel-item">
            <img src={Slots} className="d-block w-100" alt="Slide Tragaperras" />
            <Link to={"/slots"} className="stretched-link">
            <button
              className="btn btn-success btn-sm position-absolute bottom-0 start-50 translate-middle-x"
              aria-label="Ir a tragaperras"
              tabIndex={0}
            >
              JUEGA AHORA
            </button>
            </Link>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
          aria-label="Slide previa carrusel"
          tabIndex={0}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
          aria-label="Siguiente slide carrusel"
          tabIndex={0}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
