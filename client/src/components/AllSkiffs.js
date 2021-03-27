import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';
import io from 'socket.io-client';

const AllSkiffs = (prop) => {
    const [ socket ] = useState(() => io(":8000"));
    const [ socketMessage, setSocketMessage ] = useState("connecting to server");
    const [ socketId, setSocketId ] = useState();

    const [ allSkiffs, setAllSkiffs ] = useState([]);
    const [ skiffCount, setSkiffCount ] = useState(0);

    useEffect(() => {
        axios
        .get('http://localhost:8000/api/skiffs/')
        .then((response) => {
            console.log(response.data);
            setAllSkiffs(response.data);
            setSkiffCount(response.data.length);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        console.log("socket in use effect method");
        console.log(socket);
        console.log(allSkiffs);  // empty

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

        socket.on("new_added_skiff", (data) => {
            console.log("new added skiff");
            console.log(data);

            // the current state that this listener knows about was created when this component
            //      was rendered and so you MUST not rely on this!
            // to add the new object to the "current" state displayed on the page, you will
            //      need to use a callback function
            console.log("all skiffs");
            console.log(allSkiffs);

            // https://reactjs.org/docs/hooks-reference.html#functional-updates
            //      If the new state is computed using the previous state, you can pass a function to setState. 
            //      The function will receive the previous value, and return an updated value
            setAllSkiffs((prevList) => [ data, ...prevList ]);

            setSocketMessage(`Check out ${data.ownerName}'s new ${data.modelName} skiff!`);
        });

        socket.on("remove_skiff", (data) => {
            console.log("someone removed a skiff...sorry!")
            console.log(data);
            setSocketMessage("Sorry to say that a skiff has been removed  :(");
            setAllSkiffs(data);
            setSkiffCount(data.length);
        })

        return () => socket.disconnect();
    }, []);

    // skiff or skiffs in axios delete?
    const deleteSkiff = (skiffId) => {
        axios.delete("http://localhost:8000/api/skiff/" + skiffId,
        {
            // this will force the sending of the credentials / cookies so they can be updated
            // XMLHttpRequest from a different domain cannot set cooke values for their own domain
            // unless withCredentials is set to true before making the request.
            withCredentials: true
        })
        .then ((res) => {
            const deletedSkiff = res.data;
            console.log(deletedSkiff);
            const filteredSkiffsArray = allSkiffs.filter((skiff) => skiff._id !== skiffId);
            setAllSkiffs(filteredSkiffsArray);
            // after we know it was removed from the back end, inform all other clients that
            //      this skiff was removed
            // sending the full array this time to demonstrate replacing state completely
            socket.emit("deleted_skiff", filteredSkiffsArray);
        })
        .catch ((err) => {
            console.log(err);
        });
    }
    return (
        <div className="all-items-wrapper">
            <div className="header">
                {/* <h1>Tolman Skiff Projects</h1> */}
                <h2>Tolman Skiff Collection</h2>
                <p>Tolman skiffs are dory-style skiffs with semi-vee bottoms made of plywood/epoxy/fiberglass (sometimes called stitch-and-glue or composite construction). Renn Tolman, the designer of the Tolman Skiff, has built over sixty since 1986 for sport and commercial use, and many others have been built by amateurs and professionals in the US, Australia, Canada, New Zealand, Europe, and elsewhere. Renn Tolman passed away in Homer, AK - July 12th, 2014. Amateur builders continue Renn's legacy and are actively building their own Tolman Skiffs.</p>
                <p>Please register, login, and add your own Tolman Skiff to the collection.</p>

{/* Renn Tolman designed three models for his book, "Building Plans for Three Plywood / Epoxy Skiffs", the "Standard," the "Widebody," and the "Jumbo." The Standard and the Widebody are identical in profile, but the Widebody has a 3-inch "chine flat" between the sides and bottom, like most fiberglass boats (ten million fiberglass boats can't be wrong). The Jumbo is a larger skiff in every dimension, has a 4-inch chine flat, and has a deeper vee bottom. The Jumbo is designed specifically to use the new four-stroke 115 to 150 horsepower engines. */}
            </div>
        
            <ol className="all-items">
            {
                allSkiffs.map((skiff, index) =>(
                    <li key={index}>
                        <span className="image-wrapper"><img onClick={() => navigate(`/skiff/${skiff._id}`)} src={ skiff.pictureUrl } alt={ skiff.pictureDescription } title={ skiff.pictureDescription }/></span>
                        <h4>{ `${skiff.ownerName }'s  ${ skiff.modelName } Skiff`}</h4>
                        <div className="button-wrapper">
                            <button className="myButton secondary" onClick={() => navigate(`/skiff/${skiff._id}`)}>View Skiff Details</button>
                            <button type="button" className="myButton" onClick={() => navigate(`/skiff/${skiff._id}/edit`)}>Edit Skiff </button>
                            <button type="button" className="myButton" 
                            onClick={() => { if (window.confirm('Are you sure you wish to delete this Skiff?')) deleteSkiff(skiff._id) } } >Delete Skiff</button>
                        </div>
                    </li>
                ))
            }
            </ol>
            <ul className="socket-message">
                <li>Socket ID: {socketId}</li>  
                <li>Skiff Count: {skiffCount}</li>
                {/* <li>Welcome, {email}</li> */}
                <li>{ socketMessage }...</li>
            </ul>
        </div>
        
    )
}

export default AllSkiffs;