import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import { useWallet } from "../context/WalletContext.jsx";
import mp3Sound from "../assets/sound.mp3";
import cheerx21 from "../assets/cheerx21.mp3";
import FAQ from "../components/FAQ.jsx";
import "../styles/Ruleta.css";
import x11sound from "../assets/x11sound.mp3";

import ruleta from "../assets/ruleta.png";
import estrella from "../assets/estrella.png";
import x2Image from "../assets/x2.png"; // Import the x2 image
import x4Image from "../assets/x4.png";
import x6Image from "../assets/x6.png";
import x11Image from "../assets/x11.png";
import x21Image from "../assets/x21.png";

const Ruleta = () => {
  const { fetchWalletBalance } = useWallet(); 
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [numberSpins, setNumberSpins] = useState(1);
  const sectionDegrees = 360 / 25;
  const userId = localStorage.getItem("userId");

  const [audio] = useState(new Audio(mp3Sound));
  const [showX2, setShowX2] = useState(false); 
  const [showX4, setShowX4] = useState(false);
  const [showX6, setShowX6] = useState(false);
  const [showX11, setShowX11] = useState(false);
  const [showX21, setShowX21] = useState(false);

  const valuesMap = new Map([
    [0, 2],
    [1, 6],
    [2, 2],
    [3, 4],
    [4, 2],
    [5, 21],
    [6, 2],
    [7, 4],
    [8, 2],
    [9, 6],
    [10, 2],
    [11, 4],
    [12, 2],
    [13, 11],
    [14, 2],
    [15, 4],
    [16, 6],
    [17, 2],
    [18, 6],
    [19, 2],
    [20, 4],
    [21, 2],
    [22, 11],
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
      return; 
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
      const parsedValue = Math.max(0, parseInt(value, 10)); 
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
    } else if (selectedNumber === 11) {
      profit = amounts[3] * 11;
      lose = amounts[0] + amounts[1] + amounts[2] + amounts[4];
    } else if (selectedNumber === 21) {
      profit = amounts[4] * 21;
      lose = amounts[0] + amounts[1] + amounts[2] + amounts[3];
    }
    if (lose === "") lose = 0;
    setActualLose(lose);
    setActualProfit(profit);

    const response = await fetchWalletBalance(userId);
    const currentBalance = response.data.amount;

    const newBalance = currentBalance + profit - lose;

    try {
      await axios.post("http://localhost:8081/walletUpdate", {
        money: newBalance,
        id: userId,
      });

      fetchWalletBalance(userId);
    } catch (error) {
      console.error("Error updating wallet balance:", error);
    }
  };

  useEffect(() => {
    const handleSpaceKeyDown = (event) => {
      if (event.code === "Space" && !girando && !showX2 && !showX4 && !showX6 && !showX11 && !showX21) {
        event.preventDefault(); // Prevent the default behavior of the space key press
        rouletteFunctioning();
      }
    };

    window.addEventListener("keydown", handleSpaceKeyDown);

    return () => {
      window.removeEventListener("keydown", handleSpaceKeyDown);
    };
  }, [girando, showX2, showX4, showX6, showX11, showX21]);

  useEffect(() => {
    if (girando) {
      const transitionTimer = setTimeout(() => {
        setGirando(false);
        if (selectedNumber === 2) {
          setShowX2(true);
          setTimeout(() => {
            setShowX2(false);
            moneyGained(amounts);
          }, 1500); 
        } else if (selectedNumber === 4) {
          setShowX4(true);
          setTimeout(() => {
            setShowX4(false);
            moneyGained(amounts);
          }, 1500);
        } else if (selectedNumber === 6) {
          setShowX6(true);
          setTimeout(() => {
            setShowX6(false);
            moneyGained(amounts);
          }, 1500);
        } else if (selectedNumber === 11) {
          setShowX11(true);
          if (amounts[3] > 0) { 
            const x11Audio = new Audio(x11sound);
            x11Audio.play().catch((error) => {
              console.error("Failed to play the x11 audio:", error);
            });
          }
          setTimeout(() => {
            setShowX11(false);
            moneyGained(amounts);
          }, 3000);
        } else if (selectedNumber === 21) {
          setShowX21(true);
          if (amounts[4] > 0) {
            const cheerx21Audio = new Audio(cheerx21);
            cheerx21Audio.play().catch((error) => {
              console.error("Failed to play the cheer audio:", error);
            });
          }
          setTimeout(() => {
            setShowX21(false);
            moneyGained(amounts);
          }, 3000);
        } else {
          moneyGained(amounts);
        }
      }, 5100); 
      return () => clearTimeout(transitionTimer);
    }
  }, [girando]);

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return (
    <>
      <div style = {{backgroundColor: "#282828"}}>
        <Navbar />
        <div className="ruleta-page container">
          <div className="faq-container">
            <FAQ
              FAQname={"¿CÓMO JUGAR?"}
              FAQdescription={
                "HAZ TUS APUESTAS EN LOS CAMPOS DE ABAJO<br/>" +
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
                  className={`star position-absolute ${girando || showX2 || showX4 || showX6 || showX11 || showX21 ? "disabled" : ""}`}
                  src={estrella}
                  alt="Overlay"
                  onClick={!girando && !showX2 && !showX4 && !showX6 && !showX11 && !showX21 ? rouletteFunctioning : undefined}
                  aria-label="Girar ruleta"
                  role="button"
                />

                {showX2 && (
                  <img
                    src={x2Image}
                    alt="Por 2"
                    className="position-absolute pulsate non-clickable"
                    style={{
                      marginBottom: "100%",
                      marginLeft: "50%"
                    }}
                    aria-label="multiplicado por 2"
                    aria-live="assertive"
                  />
                )}
                {showX4 && (
                  <img
                    src={x4Image}
                    alt="Por 4"
                    className="position-absolute pulsate non-clickable"
                    style={{
                      marginBottom: "100%",
                      marginLeft: "50%"
                    }}
                    aria-label="multiplicado por 4"
                    aria-live="assertive"
                  />
                )}
                {showX6 && (
                  <img
                    src={x6Image}
                    alt="Por 6"
                    className="position-absolute pulsate non-clickable"
                    style={{
                      marginBottom: "100%",
                      marginLeft: "50%"
                    }}
                    aria-label="multiplicado por 6"
                    aria-live="assertive"
                  />
                )}
                {showX11 && (
                  <img
                    src={x11Image}
                    alt="Por 11"
                    className="position-absolute pulsate non-clickable"
                    style={{
                      marginBottom: "100%",
                      marginLeft: "50%"
                    }}
                    aria-label="multiplicado por 11"
                    aria-live="assertive"
                  />
                )}
                {showX21 && (
                  <img
                    src={x21Image}
                    alt="Por 21"
                    className="position-absolute pulsate non-clickable"
                    style={{
                      marginBottom: "100%",
                      marginLeft: "50%"
                    }}
                    aria-label="multiplicado por 21"
                    aria-live="assertive"
                  />
                )}
              </div>
            </div>
            <div className="col-12 col-lg-6 bets-container d-flex flex-column align-items-center align-items-lg-start">
              {amounts.map((value, index) => (
                <div key={index} className="bet-input mb-3">
                  <label htmlFor={`bet-${index}`} className="text-white form-label">
                    Apuestas al X{seccionesMap.get(index)}:
                  </label>
                  <div className="input-group">
                    <input
                      id={`bet-${index}`}
                      type="number"
                      className="form-control"
                      value={parseInt(value)}
                      onChange={(e) => handleAmountChange(index, e.target.value)}
                      aria-label={`Apuestas al por${seccionesMap.get(index)}`}
                      min="0" 
                      disabled={girando || showX2 || showX4 || showX6 || showX11 || showX21} 
                    />

                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary bet-button"
                        type="button"
                        onClick={() => handleAmountChange(index, 1)}
                        disabled={girando || showX2 || showX4 || showX6 || showX11 || showX21} 
                      >
                        1€
                      </button>
                      <button
                        className="btn btn-outline-secondary bet-button"
                        type="button"
                        onClick={() => handleAmountChange(index, 5)}
                        disabled={girando || showX2 || showX4 || showX6 || showX11 || showX21} 
                      >
                        5€
                      </button>
                      <button
                        className="btn btn-outline-secondary bet-button"
                        type="button"
                        onClick={() => handleAmountChange(index, 10)}
                        disabled={girando || showX2 || showX4 || showX6 || showX11 || showX21} 
                      >
                        10€
                      </button>
                    </div>
                  </div>
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
                disabled={insufficientFunds || girando || showX2 || showX4 || showX6 || showX11 || showX21} 
                aria-label="Girar ruleta"
              >
                Girar ruleta
              </button>
              <p
                className="text-white mt-3"
                aria-live="assertive"
              >
                Has Ganado: {actualProfit}
              </p>
              <p 
                className="text-white" 
                aria-live="assertive">
                Has Perdido: {actualLose}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Ruleta;
