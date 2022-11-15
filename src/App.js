import React, { useState, useRef } from "react";
import FireLogin from "./components/Login/FireLogin";
import { Toast } from "primereact/toast";
import MainContent from "./components/UI/MainContent";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

let App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const toastRef = useRef();
  const loggedIn = window.localStorage.getItem("isLoggedIn");

  const loginHandler = () => {
    toastRef.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Login successfull",
    });
    setIsLoggedIn(true);
    window.localStorage.setItem("isLoggedIn", true);
  };

  const logoutHandler = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setIsLoggedIn(false);
      window.localStorage.removeItem("isLoggedIn");
      
    }).catch((error) => {
      // An error happened.
    });
  };

  return (
    <React.Fragment>
      <Toast ref={toastRef} />
      {/* {!isLoggedIn && <LoginForm onLogin={loginHandler} />} */}
      {!loggedIn && !isLoggedIn && <FireLogin onLogin={loginHandler} />}
      { loggedIn && <MainContent onLogout={logoutHandler}/>}
    </React.Fragment>
  );
};

export default App;