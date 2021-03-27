import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';
import { ESRCH } from 'constants';
// import { set } from 'mongoose';
import io from 'socket.io-client';

const NewSkiff = (prop) => {
    // the setter is never used and so we will exclude it to avoid lint warnings
    const [ socket ] = useState(() => io(":8000"));

    const [ buildComplete, setBuildComplete] = useState(true);
    const [ ownerName, setOwnerName ] = useState('');
    const [ builderName, setBuilderName] = useState('');
    const [ modelName, setModelName] = useState('Standard');
    const [ startDate, setStartDate] = useState('');
    const [ finishDate, setFinishDate] = useState('');
    const [ stockLength, setStockLength] = useState('');
    const [ customLength, setCustomLength] = useState('');
    const [ pictureUrl, setPictureUrl] = useState('');
    const [ pictureDescription, setPictureDescription] = useState('');
    const [ description, setDescription] = useState('');
    const [errs, setErrs] = useState({});

    const submitForm = (e) =>{
        e.preventDefault();
        // do something with axios
        console.log('submitting form');
        // const newSkiff = {
            axios.post('http://localhost:8000/api/skiffs',{
            buildComplete: buildComplete,
            ownerName: ownerName,
            builderName: builderName,
            modelName: modelName,
            startDate: startDate,
            finishDate: finishDate,
            stockLength: stockLength,
            customLength:customLength,
            pictureUrl: pictureUrl,
            pictureDescription: pictureDescription,
            description:description,
        }, { withCredentials: true })
        .then((response) =>{
            if (response.data.errors){
                console.log(response.data.errors);
                setErrs(response.data.errors);
                console.log(response.data + "this should have created a new skiff?");
            } else {
                console.log(response.data + "is this creating new skiff?");

                // notify all of the clients that a new skiff was added
                socket.emit("added_skiff", response.data);

                // before leaving this component we need to be sure to disconnect our socket
                //      to prevent a resource leak
                socket.disconnect();

                navigate(`/skiff/${response.data._id}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <h2>Add a New Tolman Skiff
            <div className="add-me"></div> </h2>
            <form onSubmit={submitForm}>
                <ol className="form-list">
                <li> <label htmlFor="buildComplete">Build Complete</label>
                    <div className="onoffswitch">
                            <input type="checkbox" 
                                className="onoffswitch-checkbox" 
                                id="myonoffswitch" 
                                tabIndex="0" 
                                name="buildComplete"
                                checked={buildComplete}
                                onChange = {(e) => setBuildComplete(!buildComplete)}
                            />
                            <label className="onoffswitch-label" htmlFor="myonoffswitch">
                                <span className="onoffswitch-inner"></span>
                                <span className="onoffswitch-switch"></span>
                            </label>
                            
                    </div>
                </li>
                <li>
                    <label>Owner Name</label>
                    
                    <input type="text"
                        name="ownerName"
                        value={ownerName}
                        onChange = {(e) => setOwnerName(e.target.value)}
                        />
                        {
                            errs.ownerName ?
                            <span className="error-text">{errs.ownerName.message}</span>
                            :null
                        }
                </li>
                <li>
                    <label>Builder Name</label>
                    <input type="text"
                        name="builderName"
                        value={builderName}
                        onChange = {(e) => setBuilderName(e.target.value)}
                        />

                        {
                            errs.builderName ?
                            <span className="error-text">{errs.builderName.message}</span>
                            :null
                        }
                </li>
                <li>
                    <label>Model Name</label>
                    <select
                        name="modelName"
                        value={modelName}
                        onChange = {(e) => setModelName(e.target.value)}>
                            <option value="Standard">Standard</option>
                            <option value="Wide Body">Wide Body</option>
                            <option value="Jumbo">Jumbo</option>
                            <option value="Flat Bottom">Flat Bottom</option>
                        </select>
                </li>
                <li>
                    <label>Build Start Date</label>
                    <input type="date"
                        name="startDate"
                        value={startDate}
                        placeholder="mm/dd/yyyy"
                        onChange = {(e) => setStartDate(e.target.value)}
                        />
                        {
                            errs.startDate ?
                            <span className="error-text">{errs.startDate.message}</span>
                            :null
                        }
                </li>
                <li>
                    <label>Build Finish Date</label>
                    <input type="date"
                        name="finishDate"
                        value={finishDate}
                        placeholder="mm/dd/yyyy"
                        onChange = {(e) => setFinishDate(e.target.value)}
                        />
                        {
                            errs.finishDate ?
                            <span className="error-text">{errs.finishDate.message}</span>
                            :null
                        }
                </li>
                <li>
                    <label>Stock Length</label>
                    <input type="number"
                        name="stockLength"
                        value={stockLength}
                        onChange = {(e)=>setStockLength(e.target.value)}
                        />
                        {/* {
                            errs.stockLength ?
                            <span className="error-text">{errs.stockLength.message}</span>
                            :null
                        } */}
                </li>
                <li>
                    <label>Custom Length</label>
                    <input type="number"
                        name="customLength"
                        value={customLength}
                        onChange = {(e) => setCustomLength(e.target.value)}
                        />
                        {/* {
                            errs.customLength ?
                            <span className="error-text">{errs.customLength.message}</span>
                            :null
                        } */}
                </li>
                <li>
                    <label>Url for your skiff's picture</label>
                    <input type="text"
                        name="pictureUrl"
                        value={pictureUrl}
                        onChange = {(e) => setPictureUrl(e.target.value)}
                        />
                        {/* {
                            errs.pictureUrl ?
                            <span className="error-text">{errs.pictureUrl.message}</span>
                            :null
                        } */}
                </li>
                <li>
                    <label>Description for your skiff's picture</label>
                    <input type="text"
                        name="pictureDescription"
                        value={pictureDescription}
                        onChange = {(e) => setPictureDescription(e.target.value)}
                        />
                        {/* {
                            errs.pictureDescription ?
                            <span className="error-text">{errs.pictureDescription.message}</span>
                            :null
                        } */}
                </li>
                <li>
                    <label>Description</label>
                    <textarea type="text"
                        name="description"
                        value={description}
                        onChange = {(e) => setDescription(e.target.value)}
                        ></textarea>
                        {/* {
                            errs.description ?
                            <span className="error-text">{errs.description.message}</span>
                            :null
                        } */}
                </li>
                <li>
                    <button type="button" className="myButton secondary" onClick={() => navigate(`/`)}>Cancel</button>
                    <button type="submit" className="myButton">Add My Skiff</button>
                </li>
                </ol>
            </form>
        </div>
    )
}

export default NewSkiff;