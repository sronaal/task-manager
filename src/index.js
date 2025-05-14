import app from "./app.js";
import { connectDB } from './db.js'


connectDB();
app.listen(process.env.PORT, () => {   
    console.log("Server is running on port 3000");
 })