const mongoose = require('mongoose');
//const db_name = "skiffs";

module.exports =(db_name) => {
    mongoose.connect('mongodb://localhost/skiffs' + db_name, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})

.then(()=> console.log(`You are connected to the ${db_name} database`))
.catch((err) => console.log(`Something went wrong connectiong to the ${db_name} database: ${err}`));
}
// const mongoose = require('mongoose');
// const db_name = "skiffs";

// mongoose.connect('mongodb://localhost/skiffs' + db_name, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true, 
// })

// .then(()=> console.log(`You are connected to the ${db_name} database`))
// .catch((err) => console.log(`Something went wrong connectiong to the ${db_name} database ${err}`));


