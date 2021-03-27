const mongoose = require('mongoose');
const AirgunStringSchema = new mongoose.Schema({
// Register/Login
// userName
// email
// password

// since this form works as data collection to be shared with others all form inputs should be required. 
//profile
profileName: { 
    type: String,
    required: [true, "You must have a profile name"],
    minlength: [3, "Your profile name must be at least 3 characters long"],
},

airGunModel: { 
    type: String,
    required: [true, "You must have an airgun name and model"],
    minlength: [3, "Your airgun name and model must be at least 3 characters long"],
},
pelletBrand: { 
    type: String,
    required: [true, "You must have a pellet brand / model"],
    minlength: [3, "Your pellet brand name must be at least 3 characters long"],
},
caliber: { 
    type: String,
    required: [true, "You must a caliber."],
    minlength: [2, "Your caliber name must be at least 2 characters long"],
},
date: { 
        // how to set today's date automatically? maybe in the form field?
        type: Date,
        required: [true, "You must include a date"],
        min: ['2020-01-01', "Sorry you can't have a date in the past - please try again!"],
        max: [ new Date(), "You cannot say you are starting in the future"],
    }, 
startPressure: { 
    type: Number,
    required: [true, "Please set a starting pressure in PSI"],
    minlength: [3, "Your starting pressure should be at least 3 characters long"],
},
finishPressure: { 
    type: Number,
    required: [true, "Please set an ending pressure in PSI"],
    minlength: [3, "Your ending pressure should be at least 3 characters long"],
},

// create string unlimited number me thinks. Or limit to 100?
velocity: { 
    type: Number,
    required: [true, "You must set velocity in FPS."],
    minlength: [3, "Your velocity should be at least 3 characters long"],
},
pelletWeight: { 
    type: Number,
    required: [true, ""],
    minlength: [3, "Your starting pressure should be at least 3 characters long"],
},
fpe: { 
    type: Number,
},
// calculations
average: { 
    type: Number,
},
high: { 
    type: Number,
}, 
low: { 
    type: Number,
}, 
spread: { 
    type: Number,
}, 
stdDev: { 
    type: Number,
}, 
shotCount: { 
    type: Number,
},
}, {timestamps: true}) 
// THIS: collection names are all lowercase and plural based on this string "Skiff"
module.exports = mongoose.model('AirgunStrings', AirgunStringSchema);
