import React, { createContext, useState } from "react";
const Context = createContext();

const DataProvider = ({ children }) => {
  const [isFooterMinimized, setIsFooterMinimized] = useState(false);
  const [isLandingIntro, setIsLandingIntro] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  return (
    <Context.Provider
      value={{
        isFooterMinimized,
        setIsFooterMinimized,
        isLandingIntro,
        setIsLandingIntro,
        isFirstLoad,
        setIsFirstLoad,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, DataProvider };
