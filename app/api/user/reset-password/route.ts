import { DbConnect } from "@/config/mongodb";
import User from "@/Models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await DbConnect();
        const { email, otp, password } = await req.json();

        if (!email || !otp || !password) return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        if (password.length < 6) return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });

        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        if (user.VerifyOtp !== otp) {
            return NextResponse.json({ message: "Invalid OTP. Please try again." }, { status: 400 });
        }

        if (user.VerifyOtpExpire < Date.now()) {
            return NextResponse.json({ message: "OTP has expired. Please request a new one." }, { status: 400 });
        }

        user.password = password;
        user.VerifyOtp = undefined;
        user.VerifyOtpExpire = undefined;
        await user.save();

        return NextResponse.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("reset-password error:", error);
        return NextResponse.json({ message: "An error occurred. Please try again." }, { status: 500 });
    }
}
