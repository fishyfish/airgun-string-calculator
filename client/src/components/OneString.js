import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {Link, link, navigate} from '@reach/router';
import io from 'socket.io-client';

const OneString = (props) => {
    const [airgunString, setAirgunString] = useState({})
    const [loaded, setLoaded] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/airgunString/" + props.id) // works fine
            .then((res) => {
                console.log('This is so awesome' + res.data);
                setAirgunString(res.data)
                setLoaded(true);
                setAirgunString.velocity(res.data)
            })
            .catch(err=>console.log('something is errored out' + err))
    },[])
    return (
        <div className="form-list">
                <h2>{airgunString.profileName}'s String</h2>
                <ol className="item-description-list">
                    <li className="newLine"><em>Profile Name:</em> {airgunString.profileName}</li> 
                    <li className="newLine"><em>Airgun Model:</em> {airgunString.airgunModel}</li> 
                    <li className="newLine"><em>Pellet Brand:</em> {airgunString.pelletBrand}</li>
                    <li className="newLine"><em>Caliber:</em> {airgunString.caliber}</li>
                    
                    <li className="newLine"><em>Date:</em> {airgunString.date}</li>
                    <li className="newLine"><em>Starting Pressure:</em> {airgunString.startPressure} psi</li>
                    <li className="newLine"><em>Ending Pressure:</em> {airgunString.endingPressure} psi</li>  
                </ol>
                {/* needs wiring up below */}
                <h2>Computations</h2>
                <ul className="computations">
                    <li>Avg: (avg)</li>
                    <li>High: (high)</li>
                    <li>Spread: (spread)</li>
                    <li>Std Dev: (std-dev)</li>
                    <li>Shot Count: (shot-count)</li>
                </ul>
                <h2>String</h2>
                <p><em>Pellet Weight:</em> {airgunString.pelletWeight} grains</p>
                <ol className="string">
                
                {/* airgunString.map((velocity, index) => (
                    <li key={index}><em>Velocity:</em> {airgunString.velocity} fps</li>
                ) */}
                    <li><em>Velocity:</em> 850fps</li>
                    <li><em>Velocity:</em> 870fps</li>
                    <li><em>Velocity:</em> 880fps</li>
                    <li><em>Velocity:</em> 875fps</li>
                    <li><em>Velocity:</em> 850fps</li>
                    <li><em>Velocity:</em> 855fps</li>
                    <li><em>Velocity:</em> 860fps</li>
                </ol>
                <p>
                <button className="myButton secondary" onClick={() => navigate(`/`)}>
                    Back to All Airgun Strings
                </button> 
                <Link className="linkButton" to={"/string/" + props.id + "/edit"}>
                    Edit
                </Link> 
                </p>
                <div className="align-right"><em>ID:</em> {airgunString._id}</div>
        </div>
    )
}

export default OneString;