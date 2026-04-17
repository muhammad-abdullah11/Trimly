import { DbConnect } from "@/config/mongodb";
import ShortUrl from "@/Models/shortUrl.model";
import { NextResponse } from "next/server";


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("Received ID for deletion:", id);

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    await DbConnect();

    const deletedUrl = await ShortUrl.findByIdAndDelete(id);

    if (!deletedUrl) {
      return NextResponse.json(
        { message: "Short URL not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Short URL deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting short URL:", error);
    return NextResponse.json(
      { message: "Error deleting short URL" },
      { status: 500 }
    );
  }
};
