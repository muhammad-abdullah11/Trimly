import { DbConnect } from "@/config/mongodb";
import User from "@/Models/user.model";
import { NextResponse } from "next/server";
import { sendOTP } from "@/config/nodemailer";

export async function POST(req: Request) {
    try {
        await DbConnect();
        const { email } = await req.json();
        if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ message: "No account found with this email" }, { status: 404 });

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.VerifyOtp = otp;
        user.VerifyOtpExpire = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();

        const sent = await sendOTP(user.email, otp);
        if (!sent) return NextResponse.json({ message: "Failed to send OTP. Try again." }, { status: 500 });

        return NextResponse.json({ message: "OTP sent successfully" });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred. Please try again." }, { status: 500 });
    }
}
