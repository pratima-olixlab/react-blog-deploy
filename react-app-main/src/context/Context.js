import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

let userFromLocalStorage = localStorage.getItem("user");
console.log("userFromLocalStorage:", userFromLocalStorage);
let user;
try {
  user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
  user = null;
}
const INITIAL_STATE = {
  user: user,
  isFetching: false,
  error: false,
};


export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
