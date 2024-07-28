import app from "./server.js";
import { connectToDB } from "./configs/mongoose.config.js";
app.listen(process.env.PORT || 3001, ()=>{
    console.log("Server is active");
    connectToDB();
})