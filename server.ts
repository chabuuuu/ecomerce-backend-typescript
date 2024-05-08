import mongoose from "mongoose";

const app = require("./src/app");
const PORT = process.env.PORT || 3056;
const server = app.listen(PORT, ()=> {
    console.log(`WSV eCommerce start at: http://localhost:${PORT}`);
})

//Handle server exit
// process.on('SIGINT', async ()=>{
//     await mongoose.connection.close();
//     console.log('Exited mongoose connection');
//     server.close(()=> console.log('Exit server express'));
// })