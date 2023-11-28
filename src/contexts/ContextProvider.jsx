import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  setUser: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(() => {
    const storedUser = localStorage.getItem("ACCESS_USER");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      localStorage.setItem("ACCESS_USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("ACCESS_USER");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
