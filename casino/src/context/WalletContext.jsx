import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Crear el contexto
const WalletContext = createContext();

// Crear un proveedor de contexto
export const WalletProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(0);

  // Función para obtener el balance del monedero
  const fetchWalletBalance = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/wallet/${userId}`
      );
      if (response.data && response.data.amount !== undefined) {
        setWalletBalance(response.data.amount);
        return response;
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  // Función para añadir dinero al monedero
  const addAmountToWallet = async (userId, amount) => {
    try {
      const response = await axios.post("http://localhost:8081/wallet/add", {
        userId: userId,
        amountToAdd: amount,
      });
      // Actualizar el balance del monedero después de añadir dinero
      await fetchWalletBalance(userId);
      return response.data;
    } catch (error) {
      console.error("Error adding money to wallet:", error);
      throw error;
    }
  };

  // Obtener el userId desde el localStorage cuando el componente se monta
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchWalletBalance(userId);
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{ walletBalance, addAmountToWallet, fetchWalletBalance }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto
export const useWallet = () => useContext(WalletContext);
