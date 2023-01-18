const mongoose = require('mongoose');
exports.databaseConnect = () => {
    mongoose.connect("mongodb://localhost:27017/socialmedia", {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: true,
        // useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("Database connected");
    })
}