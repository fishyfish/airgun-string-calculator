import React, { useState } from 'react'
import axios from 'axios';
import {Link, link, navigate} from '@reach/router';

const StringForm = () => {
    const [profileName, setProfileName] = useState(""); 
    const [airgunModel, setAirgunModel] = useState("");
    const [pelletBrand, setPelletBrand] = useState(""); 
    const [caliber, setCaliber] = useState(""); 
    const [date, setDate] = useState("");
    const [startPressure, setStartPressure] = useState(""); 
    const [endingPressure, setEndingPressure] = useState("");
    const [velocity, setVelocity] = useState(""); 
    const [pelletWeight, setPelletWeight] = useState("");
    // contemplate allowing users to set an image, as well as photodescription and notes. 
    // const [pictureUrl, setPictureUrl] = useState(""); 
    // const [pictureDescription, setPictureDescription] = useState("");
    // const [description, setDescription] = useState("");

    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new skiff
        axios.post('http://localhost:8000/api/airgunStrings', {
            profileName,    
            airgunModel,      
            pelletBrand,
            caliber,
            finishDate,
            startPressure,
            endingPressure,
            velocity,
            // pictureUrl,
            // pictureDescription,
            // description
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }
    //onChange to update firstName and lastName
    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Profile Name</label><br/>
                <input type="text" onChange = {(e)=>setProfileName(e.target.value)}/>
            </p>
            <p>
                <label>Airgun Model</label><br/>
                <input type="text" onChange = {(e)=>setAirgunModel(e.target.value)}/>
            </p>
            <p>
                {/* make this a drop down */}
                <label>Pellet Brand</label><br/>
                <input type="text" onChange = {(e)=>setPelletBrand(e.target.value)}/>
            </p>
            <p>
                <label>Caliber</label><br/>
                <input type="number" onChange = {(e)=>setCaliber(e.target.value)}/>
            </p>
            <p> 
                {/* make this a calendar with input field */}
                <label>Date (dd/mm/yyyy)</label><br/>
                <input type="date" onChange = {(e)=>setDate(e.target.value)}/>
            </p>
            <p>
                <label>Start Pressure (psi)</label><br/>
                <input type="text" onChange = {(e)=>setStartPressure(e.target.value)}/>
            </p>
            
            <p>
                <label>Ending Pressure (psi)</label><br/>
                <input type="number" onChange = {(e)=>setEndingPressure(e.target.value)}/>
            </p>
            <p>
                <label>Pellet Weight (grains)</label><br/>
                <input type="number" onChange = {(e)=>setPelletWeight(e.target.value)}/>
            </p>
            {/* <p>
                <label>Picture URL</label><br/>
                <input type="text" onChange = {(e)=>setPictureUrl(e.target.value)}/>
            </p>
            <p>
                <label>Picture Description</label><br/>
                <input type="text" onChange = {(e)=>setPictureDescription(e.target.value)}/>
            </p>
            <p>
                <label>Description</label><br/>
                <textarea type="text" onChange = {(e)=>setDescription(e.target.value)}>

                </textarea>
            </p> */}
            <button onClick={() => navigate(`/`)}>Cancel New String</button>
            <button type="submit">Submit New String</button>
        </form>
    )
}
export default StringForm;
