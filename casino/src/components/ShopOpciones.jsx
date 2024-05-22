import React, { useState, useEffect } from "react";
import Tienda_10 from "../assets/Tienda_10.png";
import Tienda_50 from "../assets/Tienda_50.png";
import Tienda_100 from "../assets/Tienda_100.png";
import axios from "axios";

function ShopOpciones() {
  const [amountToAdd, setAmountToAdd] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(
    localStorage.getItem("showSuccessMessage") === "true"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddAmount = async () => {
    // Validar que el valor sea numérico y positivo
    const parsedAmount = parseFloat(amountToAdd);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Por favor, introduce una cantidad válida.");
      return;
    }
    setShowConfirmation(true);
  };

  const confirmAddAmount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post("http://localhost:8081/wallet/add", {
        userId: userId,
        amountToAdd: parseFloat(amountToAdd),
      });
      console.log(response.data); // Mensaje de éxito o error
      localStorage.setItem("showSuccessMessage", "true"); // Mostrar mensaje de éxito

      window.location.reload();
    } catch (error) {
      console.error("Error adding money:", error);
    }
  };

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    setAmountToAdd(amount);
  };
  useEffect(() => {
    // Limpiar localStorage cuando el componente se desmonte
    return () => {
      localStorage.removeItem("showSuccessMessage");
    };
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4 col-sm-6">
          <button
            className="btn btn-primary w-100 mb-2"
            style={{
              backgroundColor: "#E0C439",
              color: "black",
              border: "#E0C439",
            }}
            onClick={() => handleAmountSelection(10)}
          >
            <img
              className="img-fluid"
              src={Tienda_10}
              alt="Diez euros"
              style={{ width: "250px", height: "250px" }}
            />
            <p className="h3" style={{ color: "#097400", fontSize: "2rem" }}>
              10,00€
            </p>
          </button>
        </div>
        <div className="col-md-4 col-sm-6">
          <button
            className="btn btn-primary w-100 mb-2"
            style={{
              backgroundColor: "#E0C439",
              color: "black",
              border: "#E0C439",
            }}
            onClick={() => handleAmountSelection(50)}
          >
            <img
              className="img-fluid"
              src={Tienda_50}
              alt="Cincuenta euros"
              style={{ width: "250px", height: "250px" }}
            />
            <p className="h3" style={{ color: "#097400", fontSize: "2rem" }}>
              50,00€
            </p>
          </button>
        </div>
        <div className="col-md-4 col-sm-6">
          <button
            className="btn btn-primary w-100 mb-2"
            style={{
              backgroundColor: "#E0C439",
              color: "black",
              border: "#E0C439",
            }}
            onClick={() => handleAmountSelection(100)}
          >
            <img
              className="img-fluid"
              src={Tienda_100}
              alt="Cien euros"
              style={{ width: "250px", height: "250px" }}
            />
            <p className="h3" style={{ color: "#097400", fontSize: "2rem" }}>
              100,00€
            </p>
          </button>
        </div>
        <div className="col-12 mt-5">
          <div className="d-flex justify-content-center">
            <input
              type="number"
              placeholder="Añade una cantidad"
              className="form-control form-control-lg mr-2"
              style={{ maxWidth: "300px" }}
              value={amountToAdd}
              onChange={(e) => {
                setAmountToAdd(e.target.value);
                setErrorMessage(""); // Limpiar el mensaje de error al cambiar el valor
              }}
            />
            <div
              style={{
                backgroundColor: "transparent",
                color: "white",
                fontSize: "3rem",
                marginRight: "0.2em",
              }}
            >
              €
            </div>
            <button
              className="btn btn-primary text-white text-decoration-none"
              style={{ backgroundColor: "#BB9D0A" }}
              onClick={handleAddAmount}
            >
              Añadir cantidad
            </button>
          </div>
          {/* Modal para confirmación */}
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: showConfirmation ? "block" : "none" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmación</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowConfirmation(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Va dejar la página para pagar, ¿desea seguir con la compra?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={confirmAddAmount}
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowConfirmation(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showSuccessMessage && (
            <div className="alert alert-success mt-3" role="alert">
              El dinero ha sido añadido.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopOpciones;
