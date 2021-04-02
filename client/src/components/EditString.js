import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';
import { setServers } from 'dns';
import io from 'socket.io-client';
import AllStrings from './AllStrings';

const EditString = (props) => {
        const [ socket ] = useState(() => io(":8000"));
        const [airgunString, setAirgunString] = useState({})
        // const [airgunString, setAirgunString] = useState("");
        const {stringId} = props;
        const [loaded, setLoaded] = useState([]);
        const [profileName, setProfileName] = useState(""); 
        const [airgunModel, setAirgunModel] = useState("");
        const [pelletBrand, setPelletBrand] = useState(""); 
        const [caliber, setCaliber] = useState("");
        const [date, setDate] = useState("");
        const [startPressure, setStartPressure] = useState(""); 
        const [endingPressure, setEndingPressure] = useState("");
        const [velocity, setVelocity] = useState([]); 
        // const [allVelocity, setAllVelocity] = useState([]);
        // const [velocityCount, setVelocityCount] = useState([]);
        const [pelletWeight, setPelletWeight] = useState("");
        const { removeFromDom } = props;
        const [errs, setErrs] = useState({});
    
        // run once no matter what. useEffect
        useEffect(() => {
            axios.get("http://localhost:8000/api/airgunString/" +  stringId) // works fine
                .then((res) => {
                    console.log('This is so awesome' + res.data);
                    const myString =res.data;
                    console.log(myString);
                    setAirgunString(res.data);
                    setLoaded(true);
                    setProfileName(myString.profileName);
                    setAirgunModel(myString.airgunModel);
                    setPelletBrand(myString.pelletBrand);
                    setCaliber(myString.caliber);
                    setDate(myString.date);
                    setStartPressure(myString.startPressure);
                    setEndingPressure(myString.endingPressure);
                    setVelocity(myString.velocity);
                     // my naming conventions from the get go are suck o. 
                    // Where I'm using Strings should be Profile(s). Doh Makes
                    // it bloody confusing.
                    // All we're adding is Velocity and count of velocity, I think. 
                    // setAllVelocity(myString.data);
                    // setVelocityCount(myString.data.length);
                    setPelletWeight(myString.pelletWeight);
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
                // allVelocity:allVelocity,
                // velocityCount:velocityCount,
                velocity:velocity,
                pelletWeight:pelletWeight, 
            }, { withCredentials: true })  
            .then((res) => {
                if(res.data.errors){
                    console.log(res.data.errors)
                    setServers(res.data.errors)
                } else {
                    console.log(res.data);
                    // notify all of the clients that a new skiff was added
                    socket.emit("edited_airgunString", res.data);
                    // before leaving this component we need to be sure to disconnect our socket
                    //      to prevent a resource leak
                    socket.disconnect();
                   navigate(`/string/${res.data._id}/`);  
                   // think about this
                   // kevin says he'd create put in separate function. 
                   // on success ---- return true 
                   // on failure ----  return false
                }
            })
                
            .catch(err=>console.log(err))
        };

        const removeShot = (index) => {
            // new copy of velocity so we can change. 
            let newVelocityList = [...velocity];
            newVelocityList.splice(index, 1);
            console.log(newVelocityList);
            console.log(index);
            setVelocity(newVelocityList);
            // need to update airgunVelocity on backend. 
            // submit
        } 
        // dynamically add input fields and remove
        //https://www.youtube.com/watch?v=9IhsYu4eKJ8
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
                        <input type="text" placeholder={airgunString.caliber} defaultValue={airgunString.caliber} onChange = {(e)=>setCaliber(e.target.value)}/>
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
                        <input type="text" defaultValue={airgunString.startPressure} onChange = {(e)=>setStartPressure(e.target.value)}/>
                        {
                            errs.startPressure ?
                            <span className="error-text">{errs.pelletPressure.message}</span>
                            :null
                        }
                    </li>
        
                    <li>
                        <label>Ending Pressure (psi)</label>
                        <input type="text" defaultValue={airgunString.endingPressure} onChange = {(e)=>setEndingPressure(e.target.value)}/>
                        {
                            errs.endingPressure ?
                            <span className="error-text">{errs.endingPressure.message}</span>
                            :null
                        }
                    </li>
                    </ol>
                    <div className="button-wrapper right">
                     <button type="submit" className="myButton">Update Profile</button> 
                    <button type="button" className="myButton secondary"  onClick={() => navigate(`/`)}>
                        Back to All Strings
                    </button>
                </div>
                    </form>
                        
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
                    <li>
                        {/* defaultValue={airgunString.velocity} */}
                        <label>Velocity (fps)</label>
                        <input type="text"  onChange = {(e)=>setVelocity(e.target.value)}/>
                        {
                            errs.velocity ?
                            <span className="error-text">{errs.velocity.message}</span>
                            :null
                        }
                        {/* button needs wiring up to add a string to an array */}
                        {/* should this button be skipped, and just use the normal submit button below?  */}
                        <button id="add-to-string" type="button" className="myButton">Add to String (below)</button> 
                    </li>                
                  
                </ol>
                <div>
                        <h2>Edit String (value is editable in field.)</h2>
                    </div> 
                <ol className="form-list string"> 
                      {
                        velocity.map((singleVel, index) => (
                        <li key={index}>
                            <label>{index} Velocity:</label> 
                            <input type="text" defaultValue={singleVel} /> fps 
                            <button className="x" type="button" onClick={() => removeShot(index)}>x</button>
                        </li>
                      ))}  
                </ol>
               
               
                </div>
            
           
        )
    }

    export default EditString;