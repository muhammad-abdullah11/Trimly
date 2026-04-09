import { DbConnect } from "@/config/mongodb";
import ShortUrl from "@/Models/shortUrl.model";
import { NextResponse ,NextRequest} from "next/server";
import { nanoid } from "nanoid";


export async function POST(request: NextRequest) {
    await DbConnect();
    const {originalUrl} = await request.json();

    if (!originalUrl) {
        return NextResponse.json({ message: "Original URL is required" }, { status: 400 });
    }
    
    try {
    const newShortUrl = new ShortUrl({
        userId: "69d809694a7ec62432b823aa", 
        originalUrl,
        shortUrl: nanoid(8),
    });
    await newShortUrl.save();
    return NextResponse.json({ message: "Short URL created successfully" ,url:newShortUrl},{status:200});    

    } catch (error) {
        console.error("Error creating short URL:", error);
        return NextResponse.json({ message: "Error creating short URL" }, { status: 500 });
    }
    
}