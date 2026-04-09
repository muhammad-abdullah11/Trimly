import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
dotenv.config();

export const  DbConnect = async () => {
    const mongoUrl = process.env.MONGO_URL;
    if(!mongoUrl){
        throw new Error("MongoDb Url are required")
    };

    try {
        const alreadyConnected = mongoose.connection.readyState === 1;
        if(alreadyConnected){
            console.log("Already Connected to MongoDB")
            return;
        };
        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB")
    } catch (error :any) {
        console.log(error)
        return NextResponse.json({ message: "Error connecting to MongoDB: " + error.message }, { status: 500 });
    }
}