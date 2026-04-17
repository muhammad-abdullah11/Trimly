import { DbConnect } from "@/config/mongodb";
import User from "@/Models/user.model";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/config/nodemailer";

export async function POST(req: Request) {
    try {
        await DbConnect();
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (user.isVerified) {
            return NextResponse.json({ message: "User is already verified" }, { status: 400 });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.VerifyOtp = otp;
        user.VerifyOtpExpire = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();
        const emailRes = await sendVerificationEmail(user.email, user.fullName, otp);
        if(!emailRes) {
            return NextResponse.json({ message: "Failed to send verification email. Please try again later." }, { status: 500 });
        }
        return NextResponse.json({ message: "Verification email sent successfully." });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while sending verification email. Please try again." }, { status: 500 });
    }
}

