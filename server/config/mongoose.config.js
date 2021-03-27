const mongoose = require('mongoose');

module.exports =(db_name) => {
    mongoose.connect('mongodb://localhost/airgunStrings' + db_name, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})

.then(()=> console.log(`You are connected to the ${db_name} database`))
.catch((err) => console.log(`Something went wrong connectiong to the ${db_name} database: ${err}`));
}

