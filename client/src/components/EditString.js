import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';
import { setServers } from 'dns';
import io from 'socket.io-client';
// import AllStrings from './AllStrings';

const EditString = (props) => {
        const [ socket ] = useState(() => io(":8000"));
        const [airgunString, setAirgunString] = useState({})
        const {stringId} = props;
        const [loaded, setLoaded] = useState([]);
        const [profileName, setProfileName] = useState(""); 
        const [airgunModel, setAirgunModel] = useState("");
        const [pelletBrand, setPelletBrand] = useState(""); 
        const [caliber, setCaliber] = useState();
        const [date, setDate] = useState();
        const [startPressure, setStartPressure] = useState(); 
        const [endingPressure, setEndingPressure] = useState();
        const [velocity, setVelocity] = useState([]);
        const [average,setAverage] =  useState();
        const [high, setHigh] = useState();
        const [low, setLow] = useState();
        const [stdDev, setStdDev] = useState();
        const [shotCount, setShotCount ] = useState(); 
        const [pelletWeight, setPelletWeight] = useState();
        const [fpe, setFpe]= useState();
        const { removeFromDom } = props;
        const [errs, setErrs] = useState({});
    
        // run once no matter what. useEffect
        useEffect(() => {
            axios.get("http://localhost:8000/api/airgunString/" +  stringId) // works fine
                .then((res) => {
                    console.log('This is so awesome' + res.data);
                    const myShotString =res.data;
                    console.log(myShotString);
                    setAirgunString(res.data);
                    setLoaded(true);
                    setProfileName(myShotString.profileName);
                    setAirgunModel(myShotString.airgunModel);
                    setPelletBrand(myShotString.pelletBrand);
                    setCaliber(myShotString.caliber);
                    setDate(myShotString.date);
                    setStartPressure(myShotString.startPressure);
                    setEndingPressure(myShotString.endingPressure);
                    setVelocity(myShotString.velocity);
                    setAverage(myShotString.average);
                    setHigh(myShotString.high);
                    setLow(myShotString.low);
                    setStdDev(myShotString.stdDev);
                    setShotCount(myShotString.shotCount);
                    setPelletWeight(myShotString.pelletWeight);
                    setFpe(myShotString.fpe);
                    console.log("velocity " + velocity);
                })
                .catch(err=>console.log('something is errored out' + err))
        }, []);

        const onSubmitHandler = (e) => {
            e.preventDefault();
            axios.put('http://localhost:8000/api/airgunString/'  +  stringId + '/edit', {
              
                profileName:profileName,    
                airgunModel:airgunModel,      
                pelletBrand:pelletBrand,
                caliber:caliber,
                date:date,
                startPressure:startPressure,
                endingPressure:endingPressure,
                velocity:velocity,
                average:average,
                high:high,
                low:low,
                stdDev:stdDev,
                shotCount:shotCount,
                pelletWeight:pelletWeight, 
                fpe:fpe,
            }, { withCredentials: true })  
            .then((res) => {
                if(res.data.errors){
                    console.log(res.data.errors)
                    setServers(res.data.errors)
                } else {
                    console.log(res.data);
                    console.log("velocity " + velocity);
                    socket.emit("edited_airgunString", res.data);
                    socket.disconnect();
                    navigate(`/string/${res.data._id}/`);  
                }
            })
                
            .catch(err=>console.log(err))
        };

        // maybe don't need this. Rather use some method to add another input field with velocity as src to the list at the bottom (ui). 
        //Then use the regular submit button to send to the DB?
        
          const addSingleVelocity = (index) => {
            //e.preventDefault();
            axios.put('http://localhost:8000/api/airgunString/'  +  stringId + '/edit', {
                //velocity:velocity,
            }, { withCredentials: true })  
            .then((res) => {
                if(res.data.errors){
                    console.log(res.data.errors)
                    setServers(res.data.errors)
                } else {
                    let newVelocityList = [...velocity];
                    newVelocityList.push(index);
                    setVelocity(newVelocityList);
                    console.log("putting new velocity list: " + newVelocityList);
                    console.log("velocity " + velocity);
                    //console.log("index " + index);
                    //socket.emit("edited_airgunString ", res.data);
                    //socket.disconnect();                   
                   //navigate(`/string/${res.data._id}/`);  
                }
            })
                
            .catch(err=>console.log(err))
        };

        const removeShot = (index) => {
            let newVelocityList = [...velocity];
            newVelocityList.splice(index, 1 );
            console.log("new velocity list: " + newVelocityList);
            console.log("index " + index);
            setVelocity(newVelocityList);
            console.log("velocity " + velocity);
            socket.emit("edited_airgunString ", velocity);
            socket.disconnect(); 
        }

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

        return (
                <div className="form-list">
                <h2>Edit Profile</h2>
                <form onSubmit={onSubmitHandler}>
                <ol className="form-list" key={props.id}>
                    <li>
                        <label>Profile Name</label>
                        <input type="text" defaultValue={airgunString.profileName} onChange = {(e)=>setProfileName(e.target.value)}/>
                        {
                            errs.profileName ?
                            <span className="error-text">{errs.profileName.message}</span>
                            :null
                        }
                    </li>
                    <li>
                        <label>Airgun Model</label>
                        <input type="text" defaultValue={airgunString.airgunModel} onChange = {(e)=>setAirgunModel(e.target.value)}/>
                        {
                            errs.airgunModel ?
                            <span className="error-text">{errs.airgunModel.message}</span>
                            :null
                        }
                    </li>
                    <li>
                        <label>Pellet Brand</label>
                        <input type="text" defaultValue={airgunString.pelletBrand} onChange = {(e)=>setPelletBrand(e.target.value)}/>
                        {
                            errs.pelletBrand ?
                            <span className="error-text">{errs.pelletBrand.message}</span>
                            :null
                        }
                    </li>
                    <li> 
                        <label>Caliber</label>
                        <input type="number" placeholder={airgunString.caliber} defaultValue={airgunString.caliber} onChange = {(e)=>setCaliber(e.target.value)}/>
                        {
                            errs.caliber ?
                            <span className="error-text">{errs.caliber.message}</span>
                            :null
                        }
                    </li>
                    <li>
                        <label>Date</label>
                        <input type="text" defaultValue={airgunString.date} onChange = {(e)=>setDate(e.target.value)} />
                        {
                            errs.date ?
                            <span className="error-text">{errs.date.message}</span>
                            :null
                        }
                    </li>
                    <li>
                        <label>Start Pressure (psi):</label>
                        <input type="number" defaultValue={airgunString.startPressure} onChange = {(e)=>setStartPressure(e.target.value)}/>
                        {
                            errs.startPressure ?
                            <span className="error-text">{errs.pelletPressure.message}</span>
                            :null
                        }
                    </li>
        
                    <li>
                        <label>Ending Pressure (psi)</label>
                        <input type="number" defaultValue={airgunString.endingPressure} onChange = {(e)=>setEndingPressure(e.target.value)}/>
                        {
                            errs.endingPressure ?
                            <span className="error-text">{errs.endingPressure.message}</span>
                            :null
                        }
                    </li>
                    </ol>
                    <div className="button-wrapper right">
                    {/* <button type="submit" className="myButton">Update Profile</button>  */}
                    <button type="button" className="myButton secondary"  onClick={() => navigate(`/`)}>
                        Back to All Strings
                    </button>
                </div>
                    
                        
                    <h2>Create / Add String</h2>
                    <ol className="form-list">
                    <li>
                        <label>Pellet Weight (grains) - Same for all shots in a string.</label>
                        <input type="number" defaultValue={airgunString.pelletWeight} onChange = {(e)=>setPelletWeight(e.target.value)}/>
                        {
                            errs.pelletWeight ?
                            <span className="error-text">{errs.pelletWeight.message}</span>
                            :null
                        }
                    </li>
                    </ol>  
                    <ol className="form-list"> 
                    <li>
                    
                        {/* defaultValue={airgunString.velocity} */} 
                        {/* complete breaks form onClick in field */}
                        {/* onChange={(e)=>setVelocity(e.target.value)} */}

                        <label>Velocity (fps)</label>
                        <input type="number" placeholder="add shot in fps" onBlur={(e)=>addSingleVelocity(parseInt(e.target.value))} />
                        {
                            errs.velocity ?
                            <span className="error-text">{errs.velocity.message}</span>
                            :null
                        }
                        {/* 850,855,854,856,858,859,854,853,852 */}
                    
                        <button id="add-to-string" 
                            type="button" 
                            className="myButton">Add to String (below)</button> 
                    </li>    
                </ol>
                <div>
                    <h2>Edit String (value is editable in field)</h2>
                </div> 
                <ol className="form-list string"> 
                      {
                        velocity.map((singleVel, index) => (
                        <li key={index}>
                            <label> Velocity:</label> 
                            <input type="number" defaultValue={singleVel}  onBlur={(e)=>addSingleVelocity(parseInt(e.target.value))}/> fps 
                            <button className="x" type="button" onClick={() => removeShot(index)}>x</button>
                        </li>
                      ))}  
                </ol>
                <h2>Calculations</h2>
                <ul className="computations">
                    <li>Avg: 
                    <input type="text" value={velocityAverage(velocity).toFixed(0)}
                        onChange = {(e)=>setAverage(e.target.value)} readOnly />
                    </li>
                    <li>High: 
                    <input type="text" value={Math.max(...velocity)}
                        onChange = {(e)=>setHigh(e.target.value)} readOnly />
                    </li>
                    <li>Low: 
                    <input type="text" value={Math.min(...velocity)}
                        onChange = {(e)=>setLow(e.target.value)} readOnly />
                    </li>
                    <li>Std Dev: 
                        <input type="text" value={standardDeviation(velocity).toFixed(2)} 
                        onChange = {(e)=>setStdDev(e.target.value)} readOnly /></li>
                    <li>Shot Count:  
                    <input type="text" value={velocity.length} 
                        onChange = {(e)=>setShotCount(e.target.value)} readOnly/>
                    </li>
                    {/* <li>FPE: <input type="number" value={pelletWeight * velocity * velocity / 450240 * 100 / 100} 
                        onChange = {(e)=>setShotCount(e.target.value)} readOnly/>
                        </li> */}
                    
                </ul>
                <ul className='form-list'>
                    <li>
                        <button type="submit" className="myButton primary">Save Profile and Shot String</button>
                    </li>
                </ul>
                </form> 
                </div>
            
            
        )
    }

    export default EditString;