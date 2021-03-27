import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const login = event => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/user/login", {
            email: email,
            password: password,
        },
        {
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data, {email} + "logged in, oh yeah?");
            navigate("/");
        }).catch(err => {
            console.log(err + "logged out?");
            setErrorMessage(err.response.data.msg);
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <p className="error-text">{errorMessage ? errorMessage : ""}</p>
            <form onSubmit={login}>
            <label>Email</label>
            <input 
                type="text"
                name="email"
                value={email}
                onChange = {(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input 
                type="password"
                name="password"
                value={password}
                onChange = {(e) => setPassword(e.target.value)}
            />
            <div className="button-wrapper">
                <button className="myButton solo" type="submit">Sign In</button>
                
            </div>
                 {/* {
                   getLoggedInUser  ? <span>{userName}</span> : null
                    }  */}
            </form>
        </div>
    );
    };

    export default Login;
