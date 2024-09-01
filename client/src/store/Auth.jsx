import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [token,setToken]=useState("");
  const [user, setUser]=useState("");

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

   //JWT authentication - to get currently get uder data
  const userAuthentication =async()=>{
    try {
      const response = await fetch("http://localhost:5000/api/auth/user",{
        method : "GET",
        headers:{
          Authentication:`Bearer ${token}`,
        }, 
      });
      if(response.ok){
        const data = await response.json();
        console.log(data.userData);
        
        setUser(data.userData);
      }
    } catch (error) {
      console.log(error);
    }
  }


   useEffect(()=>{
    userAuthentication();
   },[]);

  return (
    <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user}}>
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