import mongoose from 'mongoose';

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgMagenta.white);
    }
    catch (error){
        console.log(error)
    }
};

export default connectDB;