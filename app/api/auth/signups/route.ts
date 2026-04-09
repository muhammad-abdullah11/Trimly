import { DbConnect } from "@/config/mongodb";
import User from "@/Models/user.model";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { fullName, userName, email, password } = await req.json();

        if(!fullName || !userName || !email || !password) {
            return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
        }
        
        await DbConnect();
    
        const isUserNameTaken = await User.findOne({ userName });
        if (isUserNameTaken) {
            return new Response(JSON.stringify({ message: "Username already taken" }), { status: 400 });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
        }
        
        const newUser = await User.create({ fullName, userName, email, password });
        

        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });

    } catch (error) {
        
        console.error("Error during user signup:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" + error }), { status: 500 });
    }
}