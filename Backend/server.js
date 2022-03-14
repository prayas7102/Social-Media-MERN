const app = require("./app");
app.listen(process.env.PORT, () => { 
    console.log(`Server is running on ${process.env.PORT}`) 
});

// https://app.getpostman.com/join-team?invite_code=6ed9bd162e1f5c563860a435adb7d751
// http://localhost:4000/api/v1/register
// {
//     "name":"Prayas",
//     "password":"213333",
//     "email":"abc@gmail.com"
// }