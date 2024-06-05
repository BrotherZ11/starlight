import React, { useState, useEffect, useRef } from "react";
import Tienda_10 from "../assets/Tienda_10.png";
import Tienda_50 from "../assets/Tienda_50.png";
import Tienda_100 from "../assets/Tienda_100.png";
import { useWallet } from "../context/WalletContext";
import axios from "axios";

function ShopOpciones() {
  const [amountToAdd, setAmountToAdd] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(
    localStorage.getItem("showSuccessMessage") === "true"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [ariaMessage, setAriaMessage] = useState("");

  const ariaLiveRef = useRef();

  const { addAmountToWallet } = useWallet();

  const handleAddAmount = () => {
    const parsedAmount = parseFloat(amountToAdd);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Por favor, introduce una cantidad válida.");
      return;
    }
    setShowConfirmation(true);
    setAriaMessage("Va a dejar la página para pagar.");
  };

  const confirmAddAmount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const currentBalanceResponse = await axios.get(
        `https://interfaces-425016.ew.r.appspot.com/wallet/${userId}`
      );
      const currentBalance = currentBalanceResponse.data.amount;
      const parsedAmount = parseFloat(amountToAdd);
      const newTotal = currentBalance + parsedAmount;
      await addAmountToWallet(userId, newTotal);
      localStorage.setItem("showSuccessMessage", "true");
      setShowSuccessMessage(true);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error adding money:", error);
    }
  };

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    setAmountToAdd(amount);
  };

  useEffect(() => {
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
              backgroundColor: "#e4a700",
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
              backgroundColor: "#e4a700",
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
              backgroundColor: "#e4a700",
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
                setErrorMessage("");
              }}
              min="0"
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
              style={{ backgroundColor: "#e4a700", border: "#e4a700" }}
              onClick={handleAddAmount}
              aria-label="añadir cantidad"
            >
              Añadir cantidad
            </button>
          </div>
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
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
                <div className="modal-body" aria-live="assertive">
                  Va a dejar la página para pagar, ¿desea seguir con la compra?
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
              Se han añadido {selectedAmount}€.
            </div>
          )}
          <div
            ref={ariaLiveRef}
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {ariaMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopOpciones;
