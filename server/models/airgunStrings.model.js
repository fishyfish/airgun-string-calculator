const mongoose = require('mongoose');
const AirgunStringSchema = new mongoose.Schema({

profileName: { 
    type: String,
    required: [true, "You must have a profile name"],
    minlength: [3, "Your profile name must be at least 3 characters long"],
},

airgunModel: { 
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
    }, 
startPressure: { 
    type: Number,
    required: [true, "Please set a starting pressure in PSI"],
    minlength: [3, "Your starting pressure should be at least 3 characters long"],
},
endingPressure: { 
    type: Number,
    required: [true, "Please set an ending pressure in PSI"],
    minlength: [3, "Your ending pressure should be at least 3 characters long"],
},
velocity: { 
    type:  Array,
    default:[],
    required: [true, "You must set velocity in FPS."],
    minlength: [3, "Your velocity should be at least 3 characters long"],
},
pelletWeight: { 
    type: Number,
    required: [true, "You should input your pellet weight so we can calulate your string"],
    minlength: [2, "Your pellet weight should be at least 2 characters long"],
},
fpe: { 
    type: Number,
    required: [false, "Stuff goes here"],
},
// calculations
average: { 
    type: Number,
    required: [false, "Stuff goes here"],
},
high: { 
    type: Number,
    required: [false, "Stuff goes here"],
}, 
low: { 
    type: Number,
    required: [false, "Stuff goes here"],
}, 
spread: { 
    type: Number,
    required: [false, "Stuff goes here"],
}, 
stdDev: { 
    type: Number,
    required: [false, "Stuff goes here"],
}, 
shotCount: { 
    type: Number,
    required: [false, "Stuff goes here"],
},
}, {timestamps: true}) 
// THIS: collection names are all lowercase and plural based on this string "Skiff"
module.exports = mongoose.model('AirgunStrings', AirgunStringSchema);
