import React, { useState } from 'react'
import axios from 'axios';
import {Link, link, navigate} from '@reach/router';

const SkiffForm = () => {
    const [ownerName, setOwnerName] = useState(""); 
    const [builderName, setBuilderName] = useState("");
    const [modelName, setModelName] = useState(""); 
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState(""); 
    const [buildComplete, setBuildComplete] = useState("");
    const [stockLength, setStockLength] = useState(""); 
    const [customLength, setCustomLength] = useState("");
    const [pictureUrl, setPictureUrl] = useState(""); 
    const [pictureDescription, setPictureDescription] = useState("");
    const [description, setDescription] = useState("");

    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new skiff
        axios.post('http://localhost:8000/api/skiffs', {
            ownerName,    
            builderName,      
            modelName,
            startDate,
            finishDate,
            buildComplete,
            stockLength,
            customLength,
            pictureUrl,
            pictureDescription,
            description
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }
    //onChange to update firstName and lastName
    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Owner Name</label><br/>
                <input type="text" onChange = {(e)=>setOwnerName(e.target.value)}/>
            </p>
            <p>
                <label>Builder Name</label><br/>
                <input type="text" onChange = {(e)=>setBuilderName(e.target.value)}/>
            </p>
            <p>
                {/* make this a drop down */}
                <label>Model Name</label><br/>
                <input type="text" onChange = {(e)=>setModelName(e.target.value)}/>
            </p>
            <p> 
                {/* make this a calendar with input field */}
                <label>Start Date</label><br/>
                <input type="text" onChange = {(e)=>setStartDate(e.target.value)}/>
            </p>
            <p>
                {/* make this a calendar with input field */}
                <label>Finish Date</label><br/>
                <input type="text" onChange = {(e)=>setFinishDate(e.target.value)}/>
            </p>
            <p>
                {/* make this true / false radio buttons */}
                <label>Build Complete</label><br/>
                {/* <input type="radio" value="yes" name="buildComplete" />
                <input type="radio" value="no" name="buildComplete" /> */}
                <input type="text" onChange = {(e)=>setBuildComplete(e.target.value)}/>
            </p>

            <p>
                <label>Stock Length</label><br/>
                <input type="text" onChange = {(e)=>setStockLength(e.target.value)}/>
            </p>
            <p>
                <label>Custom Length</label><br/>
                <input type="text" onChange = {(e)=>setCustomLength(e.target.value)}/>
            </p>
            <p>
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
            </p>
            <button onClick={() => navigate(`/`)}>Cancel New Skiff</button>
            <button type="submit">Submit New Skiff</button>
        </form>
    )
}
export default SkiffForm;
