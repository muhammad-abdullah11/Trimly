import { DbConnect } from "@/config/mongodb";
import { NextResponse } from "next/server";
import ShortUrl from "@/Models/shortUrl.model"
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/config/nextAuth";

export async function GET() {
    const session = await getServerSession(nextAuthOptions);
    if (!session || session.user.type !== "admin") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        await DbConnect();
        const urls = await ShortUrl.find().populate({ path: "userId", select: "fullName" });
        return NextResponse.json({ message: "Urls fetched successfully", totalUrls: urls.length, urls }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch urls" }, { status: 500 });
    }
}
