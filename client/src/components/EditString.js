import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';
import { setServers } from 'dns';
import io from 'socket.io-client';

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
        const [velocity, setVelocity] = useState(""); 
        const [pelletWeight, setPelletWeight] = useState("");
        const { removeFromDom } = props;
        const [errs, setErrs] = useState({});
    
        // run once no matter what. useEffect
        useEffect(() => {
            axios.get("http://localhost:8000/api/airgunString/" +  stringId) // works fine
                .then((res) => {
                    console.log('This is so awesome' + res.data);
                    setAirgunString(res.data);
                    setLoaded(true);
                    const myString =res.data;
                    console.log(myString);
                    setProfileName(myString.profileName);
                    setAirgunModel(myString.airgunModel);
                    setPelletBrand(myString.pelletBrand);
                    setCaliber(myString.caliber);
                    setDate(myString.date);
                    setStartPressure(myString.startPressure);
                    setEndingPressure(myString.endingPressure);
                    setVelocity(myString.velocity);
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
                }
            })
                
            .catch(err=>console.log(err))
        };
        // const initialList = [
        //     {
        //       id: 'a',
        //       name: 'Robin',
        //     },
        //   ];
        // const [list, setList] = React.useState(initialList);

        return (
            <form onSubmit={onSubmitHandler}>
                <div className="form-list">
                <h2>Edit Profile</h2>
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
                        <input type="date" placeholder={airgunString.Date} defaultValue={airgunString.Date} onChange = {(e)=>setDate(e.target.value)} placeholder="DD/MM/YYYY" />
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
                    <li>
                        <h2>Create / Add String</h2>
                    </li> 
                    <li>
                        <label>Pellet Weight (grains) - Should be same for all shots in a string.</label>
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
                        <button id="add-to-string" type="button" className="myButton">Add to String</button> 
                    </li>
                    {/* {velocity.map((item) => (
                        <li key={allStrings}>{airgunString.velocity}</li>
                    ))} */}
                     <li>
                        <h2>Edit String (value is editable in field. Click X to remove.)</h2>
                    </li> 
                   <li><label>Velocity (fps)</label> <input type="text" defaultValue="955"  /> fps</li>
                   <li><label>Velocity (fps)</label> <input type="text" defaultValue="850"  /> fps</li>
                   <li><label>Velocity (fps)</label> <input type="text" defaultValue="870" /> fps</li>
                   <li><label>Velocity (fps)</label> <input type="text" defaultValue="880"  /> fps</li>
                   <li><label>Velocity (fps)</label> <input type="text" defaultValue="875"  /> fps</li>
                   <li><label>Velocity (fps)</label> <input type="text" defaultValue="850" /> fps</li>
                   <li><label>Velocity (fps)</label> <input type="text" defaultValue="855"  /> fps</li>
                   <li><label>Velocity (fps)</label> <input type="text" defaultValue="860"  /> fps</li>
                </ol>
                <br />
                <div className="button-wrapper right">
                     <button type="submit" className="myButton">Update Profile</button> 
                    <button type="button" className="myButton secondary"  onClick={() => navigate(`/`)}>
                        Back to All Strings
                    </button>
                </div>
                </div>
            </form>
           
        )
    }

    export default EditString;