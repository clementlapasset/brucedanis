import React, { createContext, useState } from "react";
const Context = createContext();

const DataProvider = ({ children }) => {
  const [isFooterMinimized, setIsFooterMinimized] = useState(false);
  const [isLandingIntro, setIsLandingIntro] = useState(true);

  return (
    <Context.Provider
      value={{
        isFooterMinimized,
        setIsFooterMinimized,
        isLandingIntro,
        setIsLandingIntro,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, DataProvider };
