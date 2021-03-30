import React, {useEffect, useState } from 'react';
import { navigate}  from '@reach/router';
import axios from "axios";
//import User from '../../../server/models/user.model';

const Header = () => {
    // const [user, setUser] = useState({})
    // const [loaded, setLoaded] = useState([]);
    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/user/loggedIn", {withCredentials: true}) 
    //         .then((res) => {
    //             console.log('If this works, I will eat my hat' + res.data);
    //             setUser(res.data)
    //             setLoaded(true);
    //         })
    //         .catch(err=>console.log('something is errored out' + err))
    // },[])

    // const getLoggedInUser = () =>{
    //     axios.get('http://localhost:8000/api/user/loggedIn', {withCredentials: true})
    //     .then((res) => {
    //         console.log(res.data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }
    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/logout", {
            // no body required for this request
        },{
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        })
    };
    return (
        <div>
            <header>
                <img id="logo" src="/orange-black-target.png" alt="orange black target" />
                <div id="header-wrapper">
                    <h1>Airgun String Calculator</h1>
                    <p>Precision Target Shooting by Design</p>
                </div>
                
                <div className="button-wrapper">
                    <button className="myButton" onClick={() => navigate("/")}>All Profiles</button>
                    <button className="myButton"  onClick={() => navigate("/logreg")}>Login / Register</button>
                    <button className="myButton"  onClick={(e) => logout(e)}>Logout</button>
                    <button className="myButton" onClick={() => navigate(`/string/new/`)}>
                        Add Profile
                    </button>
                    {/* <button onClick={getLoggedInUser}>Check My Brain for a Contusion.</button> */}
                </div>
            </header>
            {/* <div className="signed-in"> Welcome, { user ? user.firstName: "oh nope"  }</div> */}
            {/* <div className="signed-in"> Welcome, { getLoggedInUser === true ? user.firstName: "nope"  }</div> */}
            {/* <button onClick={getLoggedInUser}>Check My Brain for a Contusion.</button> */}
        </div>
    )
}

export default Header;