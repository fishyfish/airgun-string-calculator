const AirgunString = require('../models/airgunStrings.model');

module.exports = {
    getAll: (req, res) => {
        AirgunString.find()
        .sort({ profileName: "ascending"})
        .then((allAirgunStrings) =>{
            res.json(allAirgunStrings);
        })
        .catch((err) =>{
            console.log('error in getAll: ' + err);
            res.json(err);
        })
},

create: (req,res) => {
    // create a string in the db
    console.log(req.body);
    AirgunString.create(req.body)
    .then((newAirgunString) => {
        console.log(newAirgunString);
        res.json(newAirgunString);
    })
    .catch((err) =>{
        console.log('error in create: ' + err);
        res.json(err);
    })
},

getOne: (req,res) => {
    // get a single string by ID
    console.log(req.params.id);
    AirgunString.findById(req.params.id)
    .then((oneAirgunString) => {
        console.log(oneAirgunString);
        res.json(oneAirgunString);
    })
    .catch((err) => {
        console.log('error in getOne: ' + err);
        res.json(err);
    })
},
update: (req,res) => {
    // get a single oneAirgunString by ID
    console.log(req.params.id);
    console.log(req.body);
    AirgunString.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    .then((updatedAirgunString) => {
        console.log(updatedAirgunString);
        res.json(updatedAirgunString);
    })
    .catch((err) => {
        console.log('error in update: ' + err);
        res.json(err);
    })
},
delete: (req,res) => {
    // remove a single airgunstring by ID
    console.log("Trying to remove this " + req.params.id);
    AirgunString.findByIdAndDelete(req.params.id, req.body,)
    .then((removedAirgunString) => {
        console.log("Removed this string " + removedAirgunString);
        res.json(removedAirgunString);
    })
    .catch((err) => {
        console.log('error in delete: ' + err);
        res.json(err);
    })
},

}