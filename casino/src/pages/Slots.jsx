import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWallet } from "../context/WalletContext"; // Importar el hook useWallet
import "../styles/Slots.css";
import { Helmet } from "react-helmet";

const SlotMachine = () => {
  const { walletBalance, addAmountToWallet, fetchWalletBalance } = useWallet();
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const symbols = ["🍒", "🍋", "🍊", "🍇", "🍉"];
  
  const resultMessageRef = useRef(null); // Ref for the result message

  // Function to generate random initial results
  const generateRandomResults = () => {
    return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
  };

  // Obtener el userId desde el localStorage cuando el componente se monta
  useEffect(() => {
    fetchWalletBalance(userId);
    setResults(generateRandomResults());
  }, []);

  // Function to display the result message
  const displayResultMessage = (message) => {
    resultMessageRef.current.innerText = message;
  };

  // Function to clear the result message
  const clearResultMessage = () => {
    resultMessageRef.current.innerText = "";
  };

  // JSX return
  return (
    <>
    <Helmet>
        <title>Tragaperras</title>
    </Helmet>
      <Navbar />
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col">
            <div className="card" style={{ backgroundColor: "#E4A700" }}>
              <div className="card-body">
                <div className="slot-frame">
                  {results.map((symbol, index) => (
                    <div className={`slot${rolling ? " rolling" : ""} display-1`} key={index}>
                      {spinning ? "🔄" : symbol}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input box for bet amount */}
        <div className="row mt-3">
          <div className="col">
            <input
              type="number"
              className="form-control"
              value={betAmount}
              onChange={(e) => setBetAmount(parseInt(e.target.value))}
              min="1"
            />
            {errorMessage && (
              <div className="text-danger mt-2">{errorMessage}</div>
            )}
          </div>
        </div>

        {/* Buttons to input various amounts */}
        <div className="row mt-3">
          <div className="col">
            <button className="btn btn-secondary mr-2 bet-button" aria-label="Apostar 1€" onClick={() => setBetAmount(1)}>
              1€
            </button>
            <button className="btn btn-secondary mr-2 bet-button" aria-label="Apostar 2€" onClick={() => setBetAmount(2)}>
              2€
            </button>
            <button className="btn btn-secondary mr-2 bet-button" aria-label="Apostar 5€" onClick={() => setBetAmount(5)}>
              5€
            </button>
            <button className="btn btn-secondary mr-2 bet-button" aria-label="Apostar 10€" onClick={() => setBetAmount(10)}>
              10€
            </button>
            <button className="btn btn-secondary mr-2 bet-button" aria-label="Apostar 20€" onClick={() => setBetAmount(20)}>
              20€
            </button>
            <button className="btn btn-secondary mr-2 bet-button" aria-label="Apostar 50€" onClick={() => setBetAmount(50)}>
              50€
            </button>
            <button className="btn btn-secondary bet-button" aria-label={`Apostar ${walletBalance}€`} onClick={() => setBetAmount(walletBalance)}>
              All In
            </button>
          </div>
        </div>

        {/* Button to spin the slot machine */}
        <div className="row mt-3">
          <div className="col">
            <button
              className={`btn btn-primary btn-lg ${spinning ? "disabled" : ""}`}
              onClick={async () => {
                if (!spinning) {
                  // Clear the result message
                  clearResultMessage();
                  
                  // Verificar si hay suficiente saldo en el monedero antes de girar
                  if (betAmount <= walletBalance) {
                    setSpinning(true);
                    setRolling(true);
                    setTimeout(() => {
                      const newResults = generateRandomResults();
                      setResults(newResults);
                      setSpinning(false);
                      setTimeout(async () => {
                        setRolling(false);
                        const allEqual = newResults.every((val, i, arr) => val === arr[0]);
                        if (allEqual) {
                          // Si los tres resultados son iguales, recuperar el doble de la apuesta
                          try {
                            await addAmountToWallet(userId, walletBalance + betAmount * 2);
                            displayResultMessage("¡FELICIDADES! Ganaste.");
                          } catch (error) {
                            console.error("Error añadiendo cantidad al monedero:", error);
                            setErrorMessage("Error procesando la apuesta.");
                          }
                        } else {
                          // Si no ganas, perder el dinero apostado
                          try {
                            await addAmountToWallet(userId, walletBalance - betAmount);
                            displayResultMessage("Más suerte para la próxima. Perdiste.");
                          } catch (error) {
                            console.error("Error sustrayendo cantidad del monedero:", error);
                            setErrorMessage("Error procesando la apuesta.");
                          }
                        }
                      }, 1000);
                    }, 2000);
                  } else {
                    setErrorMessage("No tienes suficiente dinero en tu monedero.");
                  }
                }
              }}
              disabled={spinning}
            >
              {spinning ? "Girando..." : "Girar"}
            </button>
            {/* Result message with aria-live attribute */}
            <div ref={resultMessageRef} className="text-white mt-3" aria-live="polite"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SlotMachine;
