import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StarlightLogo from "../assets/logo.png";
import { BsInfoCircle } from "react-icons/bs";
import axios from "axios";

export let setWalletMoney;

function Navbar() {
  const [walletAmount, setWalletAmount] = useState(0);

  setWalletMoney = setWalletAmount;

  useEffect(() => {
    fetchWalletAmount();
  }, []);

  const fetchWalletAmount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:8081/wallet/${userId}`
      );
      setWalletAmount(response.data.amount);
    } catch (error) {
      console.error("Error fetching wallet amount:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    setWalletAmount(0);
    window.location.href = "/";
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light py-0"
      style={{ backgroundColor: "#E4A700" }}
    >
      <Link to="/" className="navbar-brand text-decoration-none text-dark ms-2">
        <img src={StarlightLogo} alt="Volver a inicio" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        tabIndex={0}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="btn btn-sm btn-outline-light end-0 ms-2 bottom-0 mb-2 me-2"
              tabIndex={-1}
              aria-label="Ayuda"
            >
              <Link
                to="/ayuda"
                className="nav-link text-dark fw-bold d-flex align-items-center"
                aria-label="Ayuda"
              >
                Ayuda <BsInfoCircle className="ms-1" />
              </Link>
            </button>
          </li>
        </ul>
        <div className="navbar-nav">
          <div className="d-flex flex-column align-items-center text-center text-lg-start">
            <div style={{ fontFamily: "Outfit", fontWeight: "500" }}>
              <p className="fs-4 mb-0 mt-0">Monedero</p>
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                <div className="bg-transparent text-black fs-5 px-4 py-2 rounded border border-1 border-dark me-2">
                  {walletAmount.toFixed(2)}€
                </div>
                <Link
                  to="/shop"
                  className="text-white text-decoration-none h1"
                  tabIndex={0}
                >
                  <button
                    className="btn btn-primary btn-outline-light"
                    tabIndex={-1}
                    aria-label="Tienda"
                    style={{
                      backgroundColor: "#A46928",
                      border: "2px solid #A46928",
                    }}
                  >
                    +
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-lg-row align-items-center mt-2 mt-lg-0">
          {localStorage.getItem("isLoggedIn") ? (
            <button
              className="btn me-2 mb-2 "
              style={{ backgroundColor: "#BB9D0A" }}
              onClick={handleLogout}
              aria-label="Cerrar sesión"
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <button
                className="btn"
                aria-label="Inicio de sesión"
                style={{ backgroundColor: "#BB9D0A" }}
                tabIndex={-1}
              >
                <Link
                  to={"/login"}
                  className="text-white text-decoration-none"
                  tabIndex={0}
                >
                  Inicio de sesión
                </Link>
              </button>
              <button
                className="btn mt-2 mb-2"
                aria-label="Registro"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  backgroundColor: "#BB9D0A",
                }}
                tabIndex={-1}
              >
                <Link
                  to={"/signup"}
                  className="text-white text-decoration-none"
                  tabIndex={0}
                >
                  Regístrate
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;