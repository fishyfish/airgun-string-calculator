import React, { useState } from "react";
import axios from "axios";

const Register = props => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState("");

    const register = event => {
        event.preventDefault();

        const newUser = {
            userName,
            email,
            password,
            confirmPassword,
        };
        axios.post("http://localhost:8000/api/user/register",
            newUser,
            {
                withCredentials: true
            })
            .then(res => {
                console.log(res.data);

                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setErrs({});
                setConfirmReg("Thank you for Registering, you can now log in!");
            })
            .catch((err) => {
                console.log(err);
                setErrs(err.response.data.errors);
            });
    };
    return (
        <div>
            <h2>Register</h2>
            {
                confirmReg ? <h4 style={{color: "green"}}>{confirmReg} </h4> : null
            }
            <form onSubmit={register}>
                <div>
                    <label>User Name</label>
                    {
                        errs.userName ? <span className="error-text">{errs.userName.message}</span> : null
                    }
                
                <input type="text"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                 />
                </div>
                <div>
                <label>Email</label>
                    {
                        errs.email ? <span className="error-text">{errs.email.message}</span> : null
                    }
                
                <input type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 />
                </div>

                <div>
                <label>Password</label>
                    {
                        errs.password ? <span className="error-text">{errs.password.message}</span> : null
                    }
                <input type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />
                </div>

                <div>
                <label>Confirm Password</label>
                    {
                        errs.confirmPassword ? <span className="error-text">{errs.confirmPassword.message}</span> : null
                    }
                <input type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                 />
                </div>
                <div className="button-wrapper">
                    <button className="myButton solo" type="submit">Register Me</button>
                </div>
            </form>
        </div>
    );
};

export default Register;