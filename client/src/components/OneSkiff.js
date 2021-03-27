import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {Link, link, navigate} from '@reach/router';

const OneSkiff = (props) => {
    const [skiff, setSkiff] = useState({})
    const [loaded, setLoaded] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/skiff/" + props.id) // works fine
            .then((res) => {
                console.log('This is so awesome' + res.data);
                setSkiff(res.data)
                setLoaded(true);
            })
            .catch(err=>console.log('something is errored out' + err))
    },[])
    return (
        <div className="form-list">
                <h2>{skiff.ownerName}'s Tolman Skiff</h2>
                <ol className="item-description-list">
                    <li className="newLine"><img className="item-image" src={skiff.pictureUrl} /></li>
                    <li className="newLine"><em>Owner Name:</em> {skiff.ownerName}</li> 
                    <li className="newLine"><em>Builder Name:</em> {skiff.builderName}</li> 
                    <li className="newLine"><em>Model Name:</em> {skiff.modelName}</li>
                    <li className="newLine"><em>Start Date:</em> {skiff.startDate}</li>
                    <li className="newLine"><em>Finish Date:</em> {skiff.finishDate}</li>
                    <li className="newLine"><em>Build Complete:</em> 
                    
                        {skiff.buildComplete ? " Yes! On the water. " : " No, it's complicated."}

                    </li>
                    <li className="newLine"><em>Stock Length:</em> {skiff.stockLength}</li>
                    <li className="newLine"><em>Custom Length:</em> {skiff.customLength}</li>
                    <li className="newLine truncate"><em>Picture Url:</em> <a target="_blank" href={skiff.pictureUrl}>{skiff.pictureUrl}</a></li>
                    <li className="newLine"><em>Picture Description:</em> {skiff.pictureDescription}</li>
                    <li className="newLine"><em>Description:</em> {skiff.description}</li>
                    <li className="newLine"><em>ID:</em> {skiff._id}</li>
                </ol>
                <p>
                <button className="myButton secondary" onClick={() => navigate(`/`)}>
                    Back to All skiffs
                </button> 
                <Link className="linkButton" to={"/skiff/" + props.id + "/edit"}>
                    Edit
                </Link> 
                </p>
        </div>
    )
}

export default OneSkiff;