import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import StarlightLogo from "../assets/logo.png";
import { BsInfoCircle } from "react-icons/bs";
import { useWallet } from "../context/WalletContext";

function Navbar() {
  const { walletBalance, fetchWalletBalance } = useWallet();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetchWalletBalance(userId);
    }
  }, [fetchWalletBalance]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
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
        className="collapse navbar-collapse justify-content-between "
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item d-flex flex-column align-items-end">
            <button
              className="btn btn-sm btn-outline-light position-absolute align-items-end me-2"
              style={{ position: "absolute", right: "0" }}
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
                <div className="wallet-balance bg-transparent text-black fs-5 px-4 py-2 rounded border border-1 border-dark me-2">
                  {walletBalance !== undefined
                    ? walletBalance.toFixed(2)
                    : "0.00"}
                  €
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
        <div className="d-flex flex-column flex-lg-row align-items-center">
          {localStorage.getItem("isLoggedIn") ? (
            <button
              className="btn me-2 mb-5"
              style={{ backgroundColor: "#BB9D0A" }}
              onClick={handleLogout}
              tabIndex={0}
              aria-label="Cerrar sesión"
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <button
                className="btn mb-5"
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
                className="btn mb-5"
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
                  Registro
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
