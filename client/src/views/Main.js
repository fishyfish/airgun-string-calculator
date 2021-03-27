import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SkiffForm from '../components/SkiffForm';
import SkiffList from '../components/SkiffList';

const Main = () => {
    const [ message, setMessage ] = useState("Loading...")
    const [skiff, setSkiff] = useState([]);
    const [loaded, setLoaded] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api")
            .then(res=> {
                setMessage(res.data.message); 
                setSkiff(res.data) ;
                setLoaded(true);
            });  
    }, []);
    const removeFromDom = skiffId => {
        setSkiff(skiff.filter(skiff => skiff._id != skiffId));
    };
    return (
        <div className="form-wrapper">
            <div>
                {/* <h2>Message from the backend: {message}</h2> */}
                {/* <div className="add-me"></div> */}
                <h1>Tolman Skiff</h1>
                <SkiffForm/>
            </div>
            <div id="results">
                <h2>List of Skiffs</h2>
                {loaded && <SkiffList skiff={skiff}/>}
            </div>
        </div>
    )
}
export default Main;