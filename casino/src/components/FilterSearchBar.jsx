import React, { Component } from "react";

class FilterSearchBar extends Component {
  handleClick = (event) => {
    event.stopPropagation();
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.click();
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <div className="btn-group">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ fontSize: "2rem", color: "red", backgroundColor: "transparent", border: "none" }}
              tabIndex={0}
              aria-label="Filtros"
            >
              Filtros
            </button>
            <ul className="dropdown-menu">
              <li>
                <label className="dropdown-item" onClick={this.handleClick}>
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    tabIndex={0} 
                    onKeyPress={this.handleKeyPress} 
                    aria-label="Filtrar por ruletas" 
                    style={{ appearance: 'none', width: '1rem', height: '1rem', border: '1px solid #000', marginRight: '0.5rem' }} />
                  Ruletas
                </label>
              </li>
              <li>
                <label className="dropdown-item" onClick={this.handleClick}>
                  <input
                    type="checkbox" 
                    className="form-check-input" 
                    tabIndex={0} 
                    onKeyPress={this.handleKeyPress} 
                    aria-label="Filtrar por tragaperras" 
                    style={{ appearance: 'none', width: '1rem', height: '1rem', border: '1px solid #000', marginRight: '0.5rem' }} />
                  Tragaperras
                </label>
              </li>
              <li className="text-center">
                <button type="submit" tabIndex={0} className="btn btn-primary" style={{backgroundColor: "#BB9D0A"}}>
                  Filtrar
                </button>
              </li>
            </ul>
          </div>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              aria-label="Barra de búsqueda"
            />
            <button className="btn btn-outline-success" tabIndex={0} aria-label ="Buscar" type="submit">
              <i className="bi bi-search">&#x1F50E;</i>
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default FilterSearchBar;
