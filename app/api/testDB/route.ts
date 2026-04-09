import { DbConnect } from "@/config/mongodb";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        await DbConnect();
        return NextResponse.json({ message: "Connected to MongoDB successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error);
        return NextResponse.json({ message: "Error connecting to MongoDB: " + error.message }, { status: 500 });
    }   }