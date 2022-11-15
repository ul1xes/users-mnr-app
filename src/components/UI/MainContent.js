import React from "react";
import DataTableCrudDemo from "../Table/CrudUserTable";
import { Button } from "primereact/button";
import "./MainContent.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import logo from "../../assets/logo-smi.png"

const MainContent = (props) => {

  return (
    <React.Fragment>
      <section className="header-content">
       <div className="logo-header-container">
       <img src={logo} alt="SMI Logo" />
        </div> 
        <div className="button-logout-container">
          <Button label="Logout" className="p-button-raised p-button-primary" onClick={props.onLogout}/>
        </div>
      </section>
      <section className="main-content-container">
        <section className="table-content">
          <DataTableCrudDemo />
        </section>
      </section>
    </React.Fragment>
  );
};

export default MainContent;
