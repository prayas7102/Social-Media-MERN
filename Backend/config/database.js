const mongoose = require('mongoose');
exports.databaseConnect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: true,
        // useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("Database connected");
    })
}