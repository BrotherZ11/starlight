import ruleta from "../assets/ruleta.png";
import estrella from "../assets/estrella.png";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import { useWallet } from "../context/WalletContext.jsx";
import mp3Sound from "../assets/sound.mp3";
import FAQ from "../components/FAQ.jsx";
import "../styles/Ruleta.css";

const Ruleta = () => {
  const { fetchWalletBalance } = useWallet(); // Usa el hook del contexto para obtener la función de actualización del monedero
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [numberSpins, setNumberSpins] = useState(1);
  const sectionDegrees = 360 / 25;
  const userId = localStorage.getItem("userId");

  const [audio] = useState(new Audio(mp3Sound));

  const valuesMap = new Map([
    [0, 2],
    [1, 6],
    [2, 2],
    [3, 4],
    [4, 2],
    [5, 24],
    [6, 2],
    [7, 4],
    [8, 2],
    [9, 6],
    [10, 2],
    [11, 4],
    [12, 2],
    [13, 12],
    [14, 2],
    [15, 4],
    [16, 6],
    [17, 2],
    [18, 6],
    [19, 2],
    [20, 4],
    [21, 2],
    [22, 12],
    [23, 2],
    [24, 4],
  ]);

  const seccionesMap = new Map([
    [0, 2],
    [1, 4],
    [2, 6],
    [3, 11],
    [4, 21],
  ]);

  const [amounts, setAmounts] = useState(Array(5).fill(""));
  const [actualProfit, setActualProfit] = useState(0);
  const [actualLose, setActualLose] = useState(0);
  const [insufficientFunds, setInsufficientFunds] = useState(0);
  const [girando, setGirando] = useState(false);

  const handleAmountChange = async (index, value) => {
    const response = await fetchWalletBalance(userId);
    if (!response || !response.data || response.data.amount === undefined) {
      console.error("Invalid response format:", response);
      return; // Salir de la función si la respuesta no es válida
    }
    const walletAmount = response.data.amount;
    if (index < 0 || index > 5) {
      const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
      if (totalAmount > walletAmount) {
        setInsufficientFunds(true);
      } else {
        setInsufficientFunds(false);
      }
    } else {
      const newAmounts = [...amounts];
      const parsedValue = parseInt(value, 10);
      newAmounts[index] = isNaN(parsedValue) ? 0 : parsedValue;
      setAmounts(newAmounts);

      const totalAmount = newAmounts.reduce((acc, curr) => acc + curr, 0);
      if (totalAmount > walletAmount) {
        setInsufficientFunds(true);
      } else {
        setInsufficientFunds(false);
      }
    }
  };

  const rotateImage = () => {
    const randomDegrees = Math.floor(Math.random() * 25) * sectionDegrees;
    const totalDegrees = numberSpins * 360 * 5 + randomDegrees;
    setRotationDegrees(totalDegrees);
    setSelectedNumber(
      valuesMap.get(
        Math.round((totalDegrees - numberSpins * 360 * 5) / sectionDegrees)
      )
    );
    setNumberSpins((nSpin) => nSpin + 1);
  };

  const rouletteFunctioning = () => {
    rotateImage();
    handleAmountChange();

    audio.volume = 0.5;

    audio.play().catch((error) => {
      console.error("Failed to play the sound:", error);
    });
    setGirando(true);
  };

  const moneyGained = async (amounts) => {
    let profit = 0;
    let lose = 0;
    if (selectedNumber === 2) {
      profit = amounts[0] * 2;
      lose = amounts[1] + amounts[2] + amounts[3] + amounts[4];
    } else if (selectedNumber === 4) {
      profit = amounts[1] * 4;
      lose = amounts[0] + amounts[2] + amounts[3] + amounts[4];
    } else if (selectedNumber === 6) {
      profit = amounts[2] * 6;
      lose = amounts[0] + amounts[1] + amounts[3] + amounts[4];
    } else if (selectedNumber === 12) {
      profit = amounts[3] * 11;
      lose = amounts[0] + amounts[1] + amounts[2] + amounts[4];
    } else if (selectedNumber === 24) {
      profit = amounts[4] * 21;
      lose = amounts[0] + amounts[1] + amounts[2] + amounts[3];
    }
    if (lose === "") lose = 0;
    setActualLose(lose);
    setActualProfit(profit);

    const response = await fetchWalletBalance(userId);
    const currentBalance = response.data.amount;

    // Calcula el nuevo saldo del monedero
    const newBalance = currentBalance + profit - lose;

    // Actualiza el saldo en el servidor
    try {
      await axios.post("http://localhost:8081/walletUpdate", {
        money: newBalance,
        id: userId,
      });

      // Actualiza el saldo en el contexto solo después de que se actualiza en el servidor correctamente
      fetchWalletBalance(userId);
    } catch (error) {
      console.error("Error updating wallet balance:", error);
    }
  };

  useEffect(() => {
    if (girando) {
      const transitionTimer = setTimeout(() => {
        setGirando(false);
      }, 5100); // Espera 5 segundos, igual que la duración de la transición
      return () => clearTimeout(transitionTimer);
    } else {
      moneyGained(amounts);
    }
  }, [girando]);

  return (
    <>
      <Navbar />
      <div className="ruleta-page container">
        <div className="faq-container">
          <FAQ
            FAQname={"¿CÓMO JUGAR?"}
            FAQdescription={
              "HAZ TUS APUESTAS EN LOS CAMPOS ABAJO<br/>" +
              "CADA MULTIPLICADOR, MULTIPLICARÁ EL DINERO APOSTADO POR DICHO NÚMERO<br/>" +
              "DALE A GIRAR A LA RULETA"
            }
            FAQindex={6}
          />
        </div>
        <div className="row main-container">
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <div className="roulette-container position-relative">
              <img
                className="roulette img-fluid"
                src={ruleta}
                style={{
                  transform: `rotate(${rotationDegrees}deg)`,
                  transition: "transform 5s ease",
                }}
                alt="Ruleta"
              />
              <img
                className="star position-absolute"
                src={estrella}
                alt="Overlay"
                onClick={rouletteFunctioning}
                aria-label="Girar ruleta"
                role="button"
              />
            </div>
          </div>
          <div className="col-12 col-lg-6 bets-container d-flex flex-column align-items-center align-items-lg-start">
            {amounts.map((value, index) => (
              <div key={index} className="bet-input mb-3">
                <label
                  htmlFor={`bet-${index}`}
                  className="text-white form-label"
                >
                  Apuestas al X{seccionesMap.get(index)}:
                </label>
                <input
                  id={`bet-${index}`}
                  type="number"
                  className="form-control"
                  value={parseInt(value)}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  aria-label={`Apuestas al X${seccionesMap.get(index)}`}
                />
              </div>
            ))}
            {insufficientFunds && (
              <div style={{ color: "red" }} aria-label="Fondos insuficientes">
                ¡Fondos Insuficientes!
              </div>
            )}
            <button
              className="btn btn-primary mt-3"
              onClick={rouletteFunctioning}
              disabled={insufficientFunds || girando}
              aria-label="Girar ruleta"
            >
              Girar ruleta
            </button>
            <p
              className="text-white mt-3"
              aria-label={`Has ganado ${actualProfit}`}
            >
              Has Ganado: {actualProfit}
            </p>
            <p className="text-white" aria-label={`Has perdido ${actualLose}`}>
              Has Perdido: {actualLose}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ruleta;
