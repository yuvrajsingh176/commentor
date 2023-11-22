import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASS;

const Connection = async () => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.rljvk3c.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true
        })
        console.log("db connected successsfully");
    }
    catch (e) {
        console.log(e.message);      
    }
}
export default Connection;