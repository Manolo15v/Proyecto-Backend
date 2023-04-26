import mongoose from "mongoose";
import dotenv from "dotenv";

import logger from './logger.js';

dotenv.config();

const dbConnect = async () => {
    try {
        mongoose.connect(process.env.MONGOATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        logger.error(error)
        throw new Error('Error a la hora de iniciar la base de datos');
    }    
}

export default dbConnect;
