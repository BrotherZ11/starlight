import ruleta from "../assets/ruleta.png";
import estrella from "../assets/estrella.png";
import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import {setWalletMoney} from "../components/Navbar.jsx";
import mp3Sound from "../assets/sound.mp3";
import {Link} from "react-router-dom";
import FAQ from "../components/FAQ.jsx";


const Ruleta = () => {
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
        [24, 4]
    ]);

    const seccionesMap = new Map([
        [0, 2],
        [1, 4],
        [2, 6],
        [3, 11],
        [4, 21],
    ]);

    // Estado para las cantidades de los campos de texto
    const [amounts, setAmounts] = useState(Array(5).fill(''));
    const [actualProfit, setActualProfit] = useState(0);
    const [actualLose, setActualLose] = useState(0);
    const [insufficientFunds, setInsufficientFunds] = useState(0);
    const [girando, setGirando] = useState(false);

    // Función para actualizar el estado de las cantidades
    const handleAmountChange = async (index, value) => {
        const response = await axios.get(
            `http://localhost:8081/wallet/${userId}`
        );
        const walletAmount = response.data.amount;
        // eslint-disable-next-line no-undef
        if(index < 0 || index > 5){
            const totalAmount = amounts[0] + amounts[1] + amounts[2] + amounts[3] + amounts[4];
            if (totalAmount > walletAmount) {
                setInsufficientFunds(true);
            } else {
                setInsufficientFunds(false);
            }
        } else {
            const newAmounts = [...amounts];
            const parsedValue = parseInt(value, 10)
            newAmounts[index] = (isNaN(parsedValue) ? 0 : parsedValue)
            setAmounts(newAmounts);

            // Verificar si la cantidad ingresada es mayor que el saldo en la billetera
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
        setSelectedNumber(valuesMap.get(Math.round((totalDegrees - numberSpins * 360 * 5) / sectionDegrees)));
        setNumberSpins(nSpin => nSpin + 1);
    };

    const rouletteFunctioning = () => {
        rotateImage();
        handleAmountChange();

        audio.volume = 0.5;

        audio.play().catch(error => {
            console.error("Failed to play the sound:", error);
        });
        setGirando(true)
    }

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
        if(lose === '') lose = 0;
        setActualLose(lose);
        setActualProfit(profit);
        const response = await axios.get(
            `http://localhost:8081/wallet/${userId}`
        );
        const totalWalletMoney = response.data.amount + (profit - lose);
        const values = {money: totalWalletMoney, id: userId};
        axios
            .post("http://localhost:8081/walletUpdate", (values))
            .then(() => {
                setWalletMoney(totalWalletMoney);
            })
            .catch((err) => {
                window.alert("Error al actualizar el wallet.");
                console.log(err);
            });
    }

    useEffect(() => {
        if (girando) {
            const transitionTimer = setTimeout(() => {
                setGirando(false);
            }, 5100); // Espera 5 segundos, igual que la duración de la transición
            return () => clearTimeout(transitionTimer);
        }       
        moneyGained(amounts);
    }, [selectedNumber]);

    return (
        <>
            <Navbar/>
            <div style={{backgroundColor: "#282828"}}>
                <div style={{backgroundColor: "#282828"}}>
                    <nav className="navbar navbar-expand-lg">
                        <div className="align-items-start">
                            <FAQ FAQname={"¿CÓMO JUGAR?"}
                                FAQdescription={"HAZ TUS APUESTAS EN LOS CAMPOS ABAJO<br/>"+
                                "CADA MULTIPLICADOR, MULTIPLICARÁ EL DINERO APOSTADO POR DICHO NÚMERO<br/>" +
                                "DALE A GIRAR A LA RULETA"}
                                FAQindex={6}/>
                        </div>
                    </nav>
                </div>
                <div className="container d-flex flex-column align-items-center vh-100 position-relative" style={{backgroundColor: "#282828",marginBottom:"20px"}}>
                    <img
                        className="position-absolute"
                        src={ruleta}
                        style={{
                            marginTop: "25px",
                            width: "35%",
                            transform: `rotate(${rotationDegrees}deg)`,
                            transition: 'transform 5s ease',
                            zIndex: 1//Asegura que la imagen de fondo esté detrás de la imagen superpuesta
                        }}
                        alt="Ruleta"/>
                       <img
    src={estrella}
    alt="Overlay"
    className="position-absolute"
    style={{
        marginTop: "95px",
        marginLeft:"10px",
        width: "23%",
        zIndex: 2,
        cursor: "pointer" // Add cursor pointer to indicate it's clickable
    }}
    onClick={() => rouletteFunctioning()} // Move onClick event handler here
/>

                </div>
                <div className="container d-flex flex-column align-items-center vh-100 position-relative" style={{backgroundColor: "#282828", marginTop: "-230px"}}>
                    {amounts.map((value, index) => (
                        <div key={index} className="text-white">
                            Apuestas al X{seccionesMap.get(index)}:{" "}
                            <input
                                type="number"
                                value={parseInt(value)}
                                onChange={(e) => handleAmountChange(index, e.target.value)}
                                aria-label={`Apuestas al X${seccionesMap.get(index)}`}
                                style={{margin: "5px"}}
                            />
                        </div>
                    ))}
                    {insufficientFunds && (
                        <div style={{color: 'red'}} aria-label="Fondos insuficientes">¡Fondos Insuficientes!</div>
                    )}
                    {/* Botón */}
                    <button 
                        onClick={() => rouletteFunctioning()} disabled={insufficientFunds || girando} 
                        aria-label="Girar ruleta"
                        tabIndex={0}
                        >Girar ruleta
                    </button>
                    <p className="text-white" aria-label={`Has ganado ${actualProfit}`}>Has Ganado: {actualProfit}</p>
                    <p className="text-white" aria-label={`Has perdido ${actualLose}`}>Has Perdido: {actualLose}</p>
                </div>
            </div>
        </>
    );
}

export default Ruleta;
