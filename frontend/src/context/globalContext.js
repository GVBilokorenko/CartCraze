import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addCartItem = (product = {}) => {
    setCartItems(cartItems => [...cartItems, product]);
  }

  const removeCartItem = (product = {}) => {
    setCartItems(cartItems => cartItems.filter(el => el._id !== product._id));
  }

  const dataToPass = {
    products,
    setProducts,
    cartItems,
    setCartItems,
    addCartItem,
    removeCartItem
  };

  return (
    <GlobalContext.Provider value={dataToPass}>
      {children}
    </GlobalContext.Provider>
  );
};
