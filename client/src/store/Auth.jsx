import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [token,setToken]=useState("");

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };


  let isLoggedIn=!!token;
  console.log("token",token);
  console.log("isLoggedIn",isLoggedIn);

  const LogoutUser=(serverToken)=>{
    setToken("");
    return localStorage.removeItem("token",serverToken);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser}}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};