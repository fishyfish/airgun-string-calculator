const TolmanSkiff = require('../models/skiffs.model');

module.exports = {
    getAll: (req, res) => {
        TolmanSkiff.find()
        .sort({ ownerName: "ascending"})
        .then((allSkiffs) =>{
            //console.log(allSkiffs);
            res.json(allSkiffs);
        })
        .catch((err) =>{
            console.log('error in getAll: ' + err);
            res.json(err);
        })
},

create: (req,res) => {
    // create a skiff in the db
    console.log(req.body);
    TolmanSkiff.create(req.body)
    .then((newSkiff) => {
        console.log(newSkiff);
        res.json(newSkiff);
    })
    .catch((err) =>{
        console.log('error in create: ' + err);
        res.json(err);
    })
},

getOne: (req,res) => {
    // get a single skiff by ID
    console.log(req.params.id);
    TolmanSkiff.findById(req.params.id)
    .then((oneSkiff) => {
        console.log(oneSkiff);
        res.json(oneSkiff);
    })
    .catch((err) => {
        console.log('error in getOne: ' + err);
        res.json(err);
    })
},
update: (req,res) => {
    // get a single skiff by ID
    console.log(req.params.id);
    console.log(req.body);
    TolmanSkiff.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    .then((updatedSkiff) => {
        console.log(updatedSkiff);
        res.json(updatedSkiff);
    })
    .catch((err) => {
        console.log('error in update: ' + err);
        res.json(err);
    })
},
delete: (req,res) => {
    // remove a single skiff by ID
    console.log("Trying to remove this " + req.params.id);
    TolmanSkiff.findByIdAndDelete(req.params.id, req.body,)
    .then((removedSkiff) => {
        console.log("Removed this skiff " + removedSkiff);
        res.json(removedSkiff);
    })
    .catch((err) => {
        console.log('error in delete: ' + err);
        res.json(err);
    })
},

}