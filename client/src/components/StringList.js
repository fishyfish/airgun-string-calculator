import React from 'react'
import axios from 'axios';
const StringList = (props) => {
    return (
        <ol>
            {props.airgunString.map((airgunString, idx)=>{
                return <li key={idx}> 
                    <span className="newLine"><em>Profile Name:</em> {airgunString.profileName}</span> 
                    <span className="newLine"><em>Airgun Model:</em> {airgunString.airgunModel}</span> 
                    <span className="newLine"><em>Pellet Brand:</em> {airgunString.pelletBrand}</span>
                    <span className="newLine"><em>Caliber:</em> {airgunString.caliber}</span>
                    <span className="newLine"><em>Date:</em> {airgunString.date}</span>
                    <span className="newLine"><em>Start Pressure:</em> {airgunString.startPressure}</span>
                    <span className="newLine"><em>Ending Pressure:</em> {airgunString.endingPressure}</span>
                    {/* these two will be looped since each string...  */}
                    <span className="newLine"><em>Velocity:</em> {airgunString.velocity}</span>
                    <span className="newLine"><em>Pellet Weight:</em> {airgunString.pelletWeight}</span>
                    {/* <span className="newLine"><em>Picture Url:</em> {airgunString.pictureUrl}</span>
                    <span className="newLine"><em>Picture Description:</em> {airgunString.pictureDescription}</span>
                    <span className="newLine"><em>Description:</em> {airgunString.description}</span> */}
                </li>
            })}
        </ol>
    )
}
export default StringList;