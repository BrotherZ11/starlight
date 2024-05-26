import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWallet } from "../context/WalletContext"; // Importar el hook useWallet
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
  // Obtener el userId desde el localStorage cuando el componente se monta
  useEffect(() => {
    fetchWalletBalance(userId);
  }, []);
  const spin = () => {
    if (!spinning) {
      // Verificar si hay suficiente saldo en el monedero antes de girar
      if (betAmount <= walletBalance) {
        setSpinning(true);
        setRolling(true);
        setTimeout(() => {
          const newResults = symbols
            .map(() => symbols[Math.floor(Math.random() * symbols.length)])
            .slice(0, 3);
          setResults(newResults);
          setSpinning(false);
          setTimeout(async () => {
            setRolling(false);
            const allEqual = newResults.every((val, i, arr) => val === arr[0]);
            if (allEqual) {
              // Si los tres resultados son iguales, recuperar el doble de la apuesta
              try {
                await addAmountToWallet(userId, walletBalance + betAmount * 2);
              } catch (error) {
                console.error("Error adding amount to wallet:", error);
                setErrorMessage("Error al procesar la apuesta.");
              }
            } else {
              // Si no ganas, perder el dinero apostado
              try {
                await addAmountToWallet(userId, walletBalance - betAmount);
                console.log("Has perdido:", walletBalance - betAmount);
              } catch (error) {
                console.error("Error subtracting amount from wallet:", error);
                setErrorMessage("Error al procesar la apuesta.");
              }
            }
          }, 1000);
        }, 2000);
      } else {
        setErrorMessage("No tienes suficiente dinero en tu monedero.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <div className="row">
          {results.map((symbol, index) => (
            <div className="col" key={index}>
              <div className={`slot${rolling ? " rolling" : ""} display-1`}>
                {spinning ? "🔄" : symbol}
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-3">
          <div className="col">
            <button
              className={`btn btn-primary btn-lg ${spinning ? "disabled" : ""}`}
              onClick={spin}
              disabled={spinning}
            >
              {spinning ? "Spinning..." : "Spin"}
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <input
              type="number"
              className="form-control"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              min="1"
            />
            {errorMessage && (
              <div className="text-danger mt-2">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SlotMachine;
