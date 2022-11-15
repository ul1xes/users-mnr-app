import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "./LoginForm.css";

const LoginForm = (props) => {
  const usrInputRef = useRef();
  const toastRef = useRef();

  const [usrValue, setUsrValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (usrValue !== "" && pwValue !== "") {
      const enteredUsr = usrInputRef.current.value;
      console.log(enteredUsr, pwValue);
      console.log("formsubmitted");
      props.onLogin();
    } else {
      toastRef.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Login failed!",
      });
      setIsLoading(false);
      return;
    }

    setUsrValue("");
    setPwValue("");
  };

  return (
    <React.Fragment>
      <Toast ref={toastRef} />
      <section className="form-section">
        <form onSubmit={submitHandler}>
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
                  placeholder="password"
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
        </form>
      </section>
    </React.Fragment>
  );
};

export default LoginForm;
