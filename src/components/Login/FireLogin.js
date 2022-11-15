import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from 'primereact/card';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import logo from "../../assets/logo-smi.png"
import "./FireLogin.css";

const FireLogin = (props) => {
  const usrInputRef = useRef();
  const toastRef = useRef();

  const [usrValue, setUsrValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, usrValue, pwValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        props.onLogin();
        // ...
      })
      .catch(() => {
        toastRef.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Login failed!",
        });
        setIsLoading(false);
        return;
      });

    setUsrValue("");
    setPwValue("");
  };

  return (
    <React.Fragment>
      <Toast ref={toastRef} />
      <section className="logo-section">
        <div className="logo-container">
          <img src={logo} alt="SMI Logo" />
        </div>
      </section>
      <section className="form-section">
        <form onSubmit={submitHandler}>
          <Card className="p-card">
          <div className="form-container">
            <div className="form-first-row">
              <div className="username-box">
                <span className="p-float-label">
                  <InputText
                    id="in"
                    value={usrValue}
                    onChange={(e) => setUsrValue(e.target.value)}
                    ref={usrInputRef}
                  />
                  <label htmlFor="in">Username</label>
                </span>
              </div>
              <div className="password-box">
                <Password
                  placeholder="Password"
                  value={pwValue}
                  onChange={(e) => setPwValue(e.target.value)}
                  feedback={false}
                  type="password"
                />
              </div>
            </div>
            <div className="form-second-row">
              <Button label="Login" type="submit" loading={isLoading} />
            </div>
          </div>
          </Card>
        </form>
      </section>
    </React.Fragment>
  );
};

export default FireLogin;
