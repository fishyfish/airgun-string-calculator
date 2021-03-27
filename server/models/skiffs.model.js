const mongoose = require('mongoose');
const TolmanSkiffSchema = new mongoose.Schema({

// Tolman Skiffs
    ownerName: { 
        type: String,
        required: [true, "You must have an owner name"],
        minlength: [3, "Your builder name must be at least 3 characters long"],
    },
    builderName: { 
        type: String,
        required: [true, "You must have a builder name"],
        minlength: [3, "Your builder name must be at least 3 characters long"],
    },
    // email: {
    //     type: String,
    //     required: [true, "Email is required"],
    //     validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
    // },
    // password: {
    //     type: String,
    //     required: [true, "Password is required"],
    //     minlength: [8, "Password must be 8 characters or longer"]
    // },
    // this stuff above does not belong here ding bat.
    modelName: { 
        type: String,
        required: [true, "You must have a model name"],
        enum: ['Standard','Wide Body','Jumbo','Flat Bottom','Trawler'],
    },
    startDate: { 
        type: Date,
        required: [true, "You must include a start date"],
        min: ['1990-01-01', "Sorry you cannot build a boat before the plans were created - please try again!"],
        max: [ new Date(), "You cannot say you are starting in the future"],
    },
    finishDate: { 
        type: Date,
        required: [true, "You must include a start date"],
        min: ['1990-01-01', "Sorry you cannot builda  boat before the plans were created - please try again!"],
        max: [ new Date(), "You cannot say you are starting in the future"],
    },
    buildComplete: {
        type: Boolean,
        default: false,
    },
    stockLength: {
        type: Number,
        min: 15,
        max: 30,
    },
    customLength: {
        type: Number,
        min: 15,
        max: 30,
    },
    pictureUrl: {
        type: String,
    },
    pictureDescription: {
        type: String,
    },
    description:{
        type:String,
    },
    // userId: {
    //     type:String,
    // }

}, {timestamps: true}) 

// THIS: collection names are all lowercase and plural based on this string "Skiff"
module.exports = mongoose.model('Skiffs', TolmanSkiffSchema);
