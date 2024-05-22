import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-dark py-4" style={{ backgroundColor: "#E4A700", maxHeight: "270px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="mb-3">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/juegos">Juegos</Link>
              </li>
              <li>
                <Link to="/promociones">Promociones</Link>
              </li>
              <li>
                <Link to="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Sobre Nosotros</h5>
            <p>
              ¡Bienvenido a nuestro casino! Somos un equipo apasionado que busca
              brindar la mejor experiencia de juego posible a nuestros
              jugadores.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Contacto</h5>
            <p>Dirección: Av. Casino, 123</p>
            <p>Teléfono: +123 456 789</p>
            <p>Email: info@casino.com</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="mb-0">Juega con responsabilidad</p>
        <p className="mb-0">&copy; {new Date().getFullYear()} Casino Online</p>
      </div>
    </footer>
  );
}

export default Footer;
