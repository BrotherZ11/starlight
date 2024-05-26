import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWallet } from "../context/WalletContext"; // Import the useWallet hook
import "../styles/Slots.css";

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

  // Get the userId from localStorage when the component mounts
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
      <Navbar />
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col">
            <div className="card" style={{backgroundColor: "#E4A700"}}>
              <div className="card-body">
                <div className="row">
                  {results.map((symbol, index) => (
                    <div className="col" key={index}>
                      <div className={`slot${rolling ? " rolling" : ""} display-1`}>
                        {spinning ? "🔄" : symbol}
                      </div>
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
            <button className="btn btn-secondary mr-2 bet-button" onClick={() => setBetAmount(1)}>
              1€
            </button>
            <button className="btn btn-secondary mr-2 bet-button" onClick={() => setBetAmount(2)}>
              2€
            </button>
            <button className="btn btn-secondary mr-2 bet-button" onClick={() => setBetAmount(5)}>
              5€
            </button>
            <button className="btn btn-secondary mr-2 bet-button" onClick={() => setBetAmount(10)}>
              10€
            </button>
            <button className="btn btn-secondary mr-2 bet-button" onClick={() => setBetAmount(20)}>
              20€
            </button>
            <button className="btn btn-secondary mr-2 bet-button" onClick={() => setBetAmount(50)}>
              50€
            </button>
            <button className="btn btn-secondary bet-button" onClick={() => setBetAmount(walletBalance)}>
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
                  
                  // Check if there is enough balance in the wallet before spinning
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
                          // If all three results are the same, retrieve double the bet
                          try {
                            await addAmountToWallet(userId, walletBalance + betAmount * 2);
                            displayResultMessage("¡FELICIDADES! Ganaste.");
                          } catch (error) {
                            console.error("Error añadiendo cantidad al monedero:", error);
                            setErrorMessage("Error procesando la apuesta.");
                          }
                        } else {
                          // If you don't win, lose the bet money
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
                    setErrorMessage("You don't have enough money in your wallet.");
                  }
                }
              }}
              disabled={spinning}
            >
              {spinning ? "Girando..." : "Girar"}
            </button>
            {/* Result message */}
            <div ref={resultMessageRef} className="text-white mt-3"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SlotMachine;
