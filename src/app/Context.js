import React, { createContext, useState } from "react";
const Context = createContext();

const DataProvider = ({ children }) => {
  const [isFooterMinimized, setIsFooterMinimized] = useState(false);

  return (
    <Context.Provider value={{ isFooterMinimized, setIsFooterMinimized }}>
      {children}
    </Context.Provider>
  );
};

export { Context, DataProvider };
