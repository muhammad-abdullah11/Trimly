import { DbConnect } from "@/config/mongodb";
import { NextResponse,NextRequest } from "next/server";
import User from "@/Models/user.model";


export async function POST(req:NextRequest) {
    const {email,otp} = await req.json();
    
    try {
    
    await DbConnect();    
        
    if(!email){
        return NextResponse.json({message:"Email is required"},{status:400})
    };

    if(!otp){
        return NextResponse.json({message:"OTP is required"},{status:400})
    };

    const user = await User.findOne({email});

    if(!user){
        return NextResponse.json({message:"User not found"},{status:404})
    };

    if(user.VerifyOtp !==otp){
        return NextResponse.json({message:"Otp is incorrect ,try again with Correct OTP"},{status:400})
    };

    if( user.VerifyOtpExpire > Date.now()){
        return NextResponse.json({message:"Otp is expired ,try with new OTP"},{status:400})
    };

    user.isVerified = true;
    await user.save();

    return NextResponse.json({message:"Account verified successfully"},{status:200})

} catch (error) {
    console.log(error);
    return NextResponse.json({message:"Internal Server Error"},{status:500})            
    }
    
}