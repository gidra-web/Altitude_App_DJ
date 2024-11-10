import mongoose from 'mongoose';
import 'dotenv/config';
import {addAdmin} from '../utils/addAdmin.js';

export default async function connect(){
    try { 
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("DB connected")
        addAdmin();}   
     catch (error) {
        console.error("DB connection failed");
        process.exit(1);
    }
}