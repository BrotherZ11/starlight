import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-dark py-4" style={{ backgroundColor: "#E4A700" }}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-dark">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/ruleta" className="text-dark">
                  Ruleta
                </Link>
              </li>
              <li>
                <Link to="/slots" className="text-dark">
                  Slots
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-dark">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/ayuda" className="text-dark">
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <h5>Sobre Nosotros</h5>
            <p>
              ¡Bienvenido a nuestro casino! Somos un equipo apasionado que busca
              brindar la mejor experiencia de juego posible a nuestros
              jugadores.
            </p>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <h5>Contacto</h5>
            <address>
              Dirección: Av. Casino, 123
              <br />
              Teléfono:{" "}
              <a href="tel:+123456789" className="text-dark">
                +123 456 789
              </a>
              <br />
              Email:{" "}
              <a href="mailto:info@casino.com" className="text-dark">
                info@casino.com
              </a>
            </address>
          </div>
        </div>
      </div>
      <div className="text-center font-weight-bold mt-3">
        <p className="mb-0">Juega con responsabilidad</p>
        <p className="mb-0">&copy; {new Date().getFullYear()} Casino Online</p>
      </div>
    </footer>
  );
}

export default Footer;
