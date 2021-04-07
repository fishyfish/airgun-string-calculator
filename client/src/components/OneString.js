import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {Link, link, navigate} from '@reach/router';
import io from 'socket.io-client';

const OneString = (props) => {
    const [airgunString, setAirgunString] = useState({})
    const [velocity, setVelocity] = useState([])
    const [loaded, setLoaded] = useState(false);
    const [pelletWeight, setPelletWeight] = useState();
    const [average,setAverage] =  useState();
    const [high, setHigh] = useState();
    const [low, setLow] = useState();
    const [stdDev, setStdDev] = useState();
    const [shotCount, setShotCount ] = useState(); 
    //const [loaded, setLoaded] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/airgunString/" + props.id) // works fine
            .then((res) => {
                console.log('This is so awesome' + res.data);
                setAirgunString(res.data)
                setLoaded(true);
                setAverage(res.average);
                setHigh(res.high);
                setLow(res.low);
                setStdDev(res.stdDev);
                setShotCount(res.shotCount);
                setPelletWeight(res.pelletWeight);
            })
             
            .catch(err=>console.log('something is errored out' + err))
    },[])
    const standardDeviation = (arr, usePopulation = false) => {
        const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
        return Math.sqrt(
            arr
            .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
            .reduce((acc, val) => acc + val, 0) /
            (arr.length - (usePopulation ? 0 : 1)), 
            );  
        };
        const velocityAverage = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;
    if (loaded) {
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
                {/* needs wiring up below hmmmm*/}
                {/* <h2>Computations</h2>
                <ul className="computations">
                    <li>Avg: 
                    <input type="number" value={velocityAverage(velocity).toFixed(0)}
                        onChange = {(e)=>setLow(e.target.value)} readOnly />
                    </li>
                    <li>High: 
                    <input type="number" value={Math.max(...velocity)}
                        onChange = {(e)=>setLow(e.target.value)} readOnly />
                    </li>
                    <li>Low: 
                    <input type="number" value={Math.min(...velocity)}
                        onChange = {(e)=>setLow(e.target.value)} readOnly />
                    </li>
                    <li>Std Dev: 
                        <input type="number" value={standardDeviation(velocity).toFixed(2)} 
                        onChange = {(e)=>setStdDev(e.target.value)} readOnly /></li>
                    <li>Shot Count:  
                    <input type="number" value={velocity.length} 
                        onChange = {(e)=>setShotCount(e.target.value)} readOnly/>
                    </li>
                    <li>FPE: <input type="number" value={pelletWeight * velocity * velocity / 450240 * 100 / 100} 
                        onChange = {(e)=>setShotCount(e.target.value)} readOnly/>
                        </li>
                    
                </ul> */}
                <h2>String</h2>
                <p><em>Pellet Weight:</em> {airgunString.pelletWeight} grains</p>
                <ol className="string">
                {
                 airgunString.velocity.map((velocity, index) => (
                    <li key={index}><em>Velocity:</em> {velocity} fps</li>
                    )) 
                }

              
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
 } else {
     return (
        <div>
            Please wait...
            {/* add animation... */}
        </div>

     )
 }
}

export default OneString;