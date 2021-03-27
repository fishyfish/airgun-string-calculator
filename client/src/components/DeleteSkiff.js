import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';


const DeleteSkiff = (skiffId) => {
    const [allSkiffs, setAllSkiffs] = useState([]);
    axios.delete("http://localhost:8000/api/skiff/" + skiffId)
    .then ((res) => {
        const deletedSkiff = res.data;
        console.log(deletedSkiff);
        const filteredSkiffsArray = allSkiffs.filter((skiff) => skiff._id !== skiffId);
        setAllSkiffs(filteredSkiffsArray);
    })
    .catch ((err) => {
        console.log(err);
    });

}

export default DeleteSkiff;