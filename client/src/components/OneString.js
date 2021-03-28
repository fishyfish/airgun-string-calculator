import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {Link, link, navigate} from '@reach/router';

const OneString = (props) => {
    const [airgunString, setAirgunString] = useState({})
    const [loaded, setLoaded] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/airgunString/" + props.id) // works fine
            .then((res) => {
                console.log('This is so awesome' + res.data);
                setAirgunString(res.data)
                setLoaded(true);
            })
            .catch(err=>console.log('something is errored out' + err))
    },[])
    return (
        <div className="form-list">
                {/* instead of profileName should this be user name and then authenticate?  */}
                <h2>{airgunString.profileName}'s Airgun String</h2>
                <ol className="item-description-list">
                    {/* <li className="newLine"><img className="item-image" src={skiff.pictureUrl} /></li> */}
                    <li className="newLine"><em>Profile Name:</em> {airgunString.profileName}</li> 
                    <li className="newLine"><em>Airgun Model:</em> {airgunString.airgunModel}</li> 
                    <li className="newLine"><em>Pellet Brand:</em> {airgunString.pelletBrand}</li>
                    <li className="newLine"><em>Caliber:</em> {airgunString.caliber}</li>
                    
                    <li className="newLine"><em>Date:</em> {airgunString.date}</li>
                    <li className="newLine"><em>Starting Pressure:</em> {airgunString.startPressure} psi</li>
                    <li className="newLine"><em>Ending Pressure:</em> {airgunString.endingPressure} psi</li>
                    <li className="newLine"><em>Pellet Weight:</em> {airgunString.pelletWeight} grains</li>
                    <li className="newLine"><em>Velocity:</em> {airgunString.velocity} fps</li>
                    {/* <li className="newLine truncate"><em>Picture Url:</em> <a target="_blank" href={airgunString.pictureUrl}>{airgunString.pictureUrl}</a></li>
                    <li className="newLine"><em>Picture Description:</em> {airgunString.pictureDescription}</li>
                    <li className="newLine"><em>Description:</em> {airgunString.description}</li> */}
                    <li className="newLine"><em>ID:</em> {airgunString._id}</li>
                </ol>
                <p>
                <button className="myButton secondary" onClick={() => navigate(`/`)}>
                    Back to All Airgun Strings
                </button> 
                <Link className="linkButton" to={"/string/" + props.id + "/edit"}>
                    Edit
                </Link> 
                </p>
        </div>
    )
}

export default OneString;