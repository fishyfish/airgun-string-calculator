import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';


const DeleteString = (airgunStringId) => {
    const [allAirgunStrings, setAllAirgunStrings] = useState([]);
    axios.delete("http://localhost:8000/api/airgunString/" + airgunStringId)
    .then ((res) => {
        const deletedAirgunString = res.data;
        console.log(deletedAirgunString);
        const filteredAirgunStringsArray = allAirgunStrings.filter((airgunString) => airgunString._id !== airgunStringId);
        setAllAirgunStrings(filteredAirgunStringsArray);
    })
    .catch ((err) => {
        console.log(err);
    });

}

export default DeleteString;