import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';
import io from 'socket.io-client';

const AllStrings = (prop) => {
    const [ socket ] = useState(() => io(":8000"));
    const [ socketMessage, setSocketMessage ] = useState("connecting to server");
    const [ socketId, setSocketId ] = useState();

    const [ allStrings, setAllStrings ] = useState([]);
    const [ stringCount, setStringCount ] = useState(0);

    useEffect(() => {
        axios
        .get('http://localhost:8000/api/airgunStrings/')
        .then((response) => {
            console.log(response.data);
            setAllStrings(response.data);
            setStringCount(response.data.length);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        console.log("socket in use effect method");
        console.log(socket);
        console.log(allStrings);  // empty

        // This event is fired by the socket instance upon connection and reconnection
        socket.on("connect", () => {
            console.log(socket.id); // x8WIv7-mJelg7on_ALbx
            setSocketId(socket.id);
        });

        // This event is fired upon disconnection
        socket.on("disconnect", (reason) => {
            console.log("socket disconnected: " + socket.id); // expect it to be undefined
            setSocketId(socket.id); // reset state to ensure we can see it on the page

            // disconnect reasons -->  https://socket.io/docs/v3/client-socket-instance/#Events
            if (reason === "io server disconnect") {
                // the disconnection was initiated by the server, you need to reconnect manually
                socket.connect();
            }
            // else the socket will automatically try to reconnect
        });

        socket.io.on("reconnection_attempt", () => {
            console.log(`reconnect attempt for ${socket.id}`); // undefined
        });

        socket.io.on("reconnect", () => {
            console.log(`reconnect success for ${socket.id}`); // undefined
        });

        socket.on('your_socket_id', (data) => {
            console.log(`The server told us that our socket id is: ${data}`);
        });

        socket.on("new_added_string", (data) => {
            console.log("new added airgun string");
            console.log(data);

            // the current state that this listener knows about was created when this component
            //      was rendered and so you MUST not rely on this!
            // to add the new object to the "current" state displayed on the page, you will
            //      need to use a callback function
            console.log("all airgun Strings");
            console.log(allStrings);

            // https://reactjs.org/docs/hooks-reference.html#functional-updates
            //      If the new state is computed using the previous state, you can pass a function to setState. 
            //      The function will receive the previous value, and return an updated value
            setAllStrings((prevList) => [ data, ...prevList ]);

            setSocketMessage(`Check out ${data.profileName}`);
        });

        socket.on("remove_String", (data) => {
            console.log("someone removed a string...sorry!")
            console.log(data);
            setSocketMessage("Sorry to say that a string has been removed  :(");
            setAllStrings(data);
            setStringCount(data.length);
        })

        return () => socket.disconnect();
    }, []);

    // skiff or skiffs in axios delete?
    const deleteString = (stringId) => {
        axios.delete("http://localhost:8000/api/airgunString/" + stringId,
        {
            // this will force the sending of the credentials / cookies so they can be updated
            // XMLHttpRequest from a different domain cannot set cooke values for their own domain
            // unless withCredentials is set to true before making the request.
            withCredentials: true
        })
        .then ((res) => {
            const deletedString = res.data;
            console.log(deletedString);
            const filteredStringsArray = allStrings.filter((string) => string._id !== stringId);
            setAllStrings(filteredStringsArray);
            // after we know it was removed from the back end, inform all other clients that
            //      this airgun string was removed
            // sending the full array this time to demonstrate replacing state completely
            socket.emit("deleted_airgunString", filteredStringsArray);
        })
        .catch ((err) => {
            console.log(err);
        });
    }
    return (
        <div className="all-items-wrapper">
            <div className="header">
                <h2>Airgun String Collection</h2>
            </div>
        
            <ol className="all-items">
            {
                allStrings.map((string, index) =>(
                    <li key={index}>
                        <h4>{ `${string.profileName }'s  "Airgun String"`}</h4>
                        <div className="button-wrapper">
                            <button className="myButton secondary" onClick={() => navigate(`/string/${string._id}`)}>View Airgun String Details</button>
                            <button type="button" className="myButton" onClick={() => navigate(`/string/${string._id}/edit`)}>Edit Airgun String </button>
                            <button type="button" className="myButton" 
                            onClick={() => { if (window.confirm('Are you sure you wish to delete this Airgun String?')) deleteString(string._id) } } >Delete Airgun String</button>
                        </div>
                    </li>
                ))
            }
            </ol>
            <ul className="socket-message">
                <li>Socket ID: {socketId}</li>  
                <li>Airgun String Count: {stringCount}</li>
                <li>{ socketMessage }...</li>
            </ul>
        </div>
        
    )
}

export default AllStrings;