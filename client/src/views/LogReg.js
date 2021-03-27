import React from "react";
import { navigate } from "@reach/router";
import Login from "../components/Login";
import RegisterUser from "../components/RegisterUser";
import Register from "../components/RegisterUser";

const LogReg = () => {

    return (
        <div className="page-wrapper">
            <Login />
            <hr />
            <RegisterUser />
            {/* <div className="button-wrapper">
                <button className="myButton" onClick={() => navigate('/')}>Back to All Skiffs</button>
            </div> */}
        </div>
    )
}

export default LogReg;