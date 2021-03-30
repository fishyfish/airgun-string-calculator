import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';
import { ESRCH } from 'constants';
import io from 'socket.io-client';

const NewString = (prop) => {
    // the setter is never used and so we will exclude it to avoid lint warnings
    const [ socket ] = useState(() => io(":8000"));

    const [ profileName, setProfileName] = useState('');
    const [ airgunModel, setAirgunModel ] = useState('');
    const [ pelletBrand, setPelletBrand] = useState('');
    const [ caliber, setCaliber] = useState('');
    const [ startPressure, setStartPressure] = useState('');
    const [ endingPressure, setEndingPressure] = useState('');
    const [ date, setDate] = useState('');
    const [ velocity, setVelocity] = useState('');
    const [ pelletWeight, setPelletWeight] = useState('');
    const [errs, setErrs] = useState({});

 

    const submitForm = (e) =>{
        e.preventDefault();
        console.log('submitting form');
            axios.post('http://localhost:8000/api/airgunStrings',{
            profileName: profileName,
            airgunModel: airgunModel,
            pelletBrand: pelletBrand,
            caliber: caliber,
            startPressure: startPressure,
            endingPressure: endingPressure,
            date: date,
            velocity:velocity,
            pelletWeight:pelletWeight,
        }, { withCredentials: true })
        .then((response) =>{
            if (response.data.errors){
                console.log(response.data.errors);
                setErrs(response.data.errors);
                console.log(response.data + "this should have created a new airgun string?");
            } else {
                console.log(response.data + "is this creating new airgun string?");

                // notify all of the clients that a new airgun string was added
                socket.emit("added_airgunString", response.data);

                // before leaving this component we need to be sure to disconnect our socket
                //      to prevent a resource leak
                socket.disconnect();

                navigate(`/string/${response.data._id}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })

        // var someDate = new Date();
        // var currDate = someDate.setDate(someDate.getDate()); 
    }

    return (
        <div>
            <h2>Add a New Airgun Profile </h2>
            <form onSubmit={submitForm}>
                <ol className="form-list">
                <li>
                    <label>Profile Name</label>
                    <input type="text"
                        name="profileName"
                        value={profileName}
                        onChange = {(e) => setProfileName(e.target.value)}
                        />
                        {
                            errs.profileName ?
                            <span className="error-text">{errs.profileName.message}</span>
                            :null
                        }
                </li>
                <li>
                    <label>Airgun Model</label>
                    <input type="text"
                        name="airgunModel"
                        value={airgunModel}
                        onChange = {(e) => setAirgunModel(e.target.value)}
                        />

                        {
                            errs.airgunModel ?
                            <span className="error-text">{errs.airgunModel.message}</span>
                            :null
                        }
                </li>
                <li>
                    <label>Pellet Brand</label>
                    <input type="text"
                        name="pelletBrand"
                        value={pelletBrand}
                        onChange = {(e) => setPelletBrand(e.target.value)}
                        />

                        {
                            errs.pelletBrand ?
                            <span className="error-text">{errs.pelletBrand.message}</span>
                            :null
                        }
                </li>
                <li>
                    <label>Caliber</label>
                    <input type="text"
                        name="caliber"
                        value={caliber}
                        placeholder=""
                        onChange = {(e) => setCaliber(e.target.value)}
                        />
                        {
                            errs.caliber ?
                            <span className="error-text">{errs.caliber.message}</span>
                            :null
                        }
                </li>
                <li>
                    <label>Date</label>

                    <input id="date" type="date"
                        name="date"
                        value={date}
                        placeholder="DD/MM/YYYY"
                        onChange = {(e) => setDate(e.target.value)}
                        />
                        {
                            errs.date ?
                            <span className="error-text">{errs.date.message}</span>
                            :null
                        }
                </li>
                <li>
                    <label>Start Pressure (PSI)</label>
                    <input type="text"
                        name="startPressure"
                        value={startPressure}
                        placeholder=""
                        onChange = {(e) => setStartPressure(e.target.value)}
                        />
                        {
                            errs.startPressure ?
                            <span className="error-text">{errs.startPressure.message}</span>
                            :null
                        }
                </li>
                <li>
                <label>Ending Pressure (PSI)</label>
                    <input type="text"
                        name="endingPressure"
                        value={endingPressure}
                        placeholder=""
                        onChange = {(e) => setEndingPressure(e.target.value)}
                        />
                        {
                            errs.endingPressure ?
                            <span className="error-text">{errs.endingPressure.message}</span>
                            :null
                        }
                </li>
                <li>
                        <h2>Create String</h2>
                </li> 
                <li>
                    <label>Pellet Weight (grains)</label>
                    <input type="number"
                        name="pelletWeight"
                        value={pelletWeight}
                        onChange = {(e)=>setPelletWeight(e.target.value)}
                        />
                         {
                            errs.pelletWeight ?
                            <span className="error-text">{errs.pelletWeight.message}</span>
                            :null
                        }
                </li>
                <li>
                    <label>Velocity</label>
                    <input type="number"
                        name="velocity"
                        value={velocity}
                        onChange = {(e)=>setVelocity(e.target.value)}
                        />
                        {
                            errs.stockLength ?
                            <span className="error-text">{errs.stockLength.message}</span>
                            :null
                        } 
                </li>
                <li>
                    <button type="button" className="myButton secondary" onClick={() => navigate(`/`)}>Cancel</button>
                    <button type="submit" className="myButton">Add My Profile</button>
                </li>
                </ol>
            </form>
        </div>
    )
}

export default NewString;