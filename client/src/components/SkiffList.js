import React from 'react'
import axios from 'axios';
//import productModel from '../../../server/models/skiffs.model';
const SkiffList = (props) => {
    return (
        <ol>
            {props.skiff.map((skiff, idx)=>{
                return <li key={idx}> 
                    <span className="newLine"><em>Owner Name:</em> {skiff.ownerName}</span> 
                    <span className="newLine"><em>Builder Name:</em> {skiff.builderName}</span> 
                    <span className="newLine"><em>Model Name:</em> {skiff.modelName}</span>
                    <span className="newLine"><em>Start Date:</em> {skiff.startDate}</span>
                    <span className="newLine"><em>Finish Date:</em> {skiff.finishDate}</span>
                    <span className="newLine"><em>Build Complete:</em> {skiff.buildComplete}</span>
                    <span className="newLine"><em>Stock Length:</em> {skiff.stockLength}</span>
                    <span className="newLine"><em>Custom Length:</em> {skiff.customLength}</span>
                    <span className="newLine"><em>Picture Url:</em> {skiff.pictureUrl}</span>
                    <span className="newLine"><em>Picture Description:</em> {skiff.pictureDescription}</span>
                    <span className="newLine"><em>Description:</em> {skiff.description}</span>
                </li>
            })}
        </ol>
    )
}
export default SkiffList;