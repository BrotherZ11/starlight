import React from "react";
import { Link } from "react-router-dom";
import Ruleta from "../assets/caruselRuleta.png";
import Slots from "../assets/slotsBoton.png";

function BotonesJuegos() {
  return (
    <div className="d-flex justify-content-lg-start justify-content-center flex-wrap ms-3">
      <div className="btn-container mb-3 me-lg-3" tabIndex={-1}>
        <Link to={"/ruleta"} tabIndex={0}>
          <button
            className="btn btn-primary position-relative p-0 border-0 overflow-hidden boton-juego"
            aria-label="Ir a ruleta"
            tabIndex={-1}
          >
            <img src={Ruleta} className="img-fluid" alt="Ruleta" />
            {/* <span className="position-absolute text-black h2 top-50 start-50 translate-middle">
              RULETA
            </span> */}
          </button>
        </Link>
      </div>
      <div className="btn-container" tabIndex={-1}>
        <Link to={"/slots"} tabIndex={0}>
          <button
            className="btn btn-primary position-relative p-0 border-0 overflow-hidden boton-juego"
            aria-label="Ir a slots"
            tabIndex={-1}
          >
            <img src={Slots} className="img-fluid" alt="Slots" />
            {/* <span className="position-absolute text-black h2 top-50 start-50 translate-middle">
              TRAGAPERRAS
            </span> */}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BotonesJuegos;
