// AddressContext.js
import React, { createContext, useContext, useState } from 'react';

const AddressContext = createContext();

export const useAddress = () => {
  return useContext(AddressContext);
};

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState('');

  const updateAddress = (newAddress) => {
    setAddress(newAddress);
  };

  return (
    <AddressContext.Provider value={{ address, updateAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
