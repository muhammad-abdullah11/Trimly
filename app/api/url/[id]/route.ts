import { DbConnect } from "@/config/mongodb";
import ShortUrl from "@/Models/shortUrl.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";


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




function getIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

function getRefererDomain(referer: string) {
  try {
    return referer ? new URL(referer).hostname : "";
  } catch {
    return "";
  }
}

function isBot(userAgent: string) {
  return /bot|crawler|spider|crawl|preview|facebookexternalhit/i.test(
    userAgent
  );
}

async function getIpInfo(ip: string) {
  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "ID is required" },
      { status: 400 }
    );
  }

  try {
    await DbConnect();

    const shortUrl = await ShortUrl.findOne({ shortUrl: id });

    if (!shortUrl) {
      return NextResponse.json(
        { message: "Short URL not found" },
        { status: 404 }
      );
    }

    const headers = request.headers;

    const userAgent = headers.get("user-agent") || "unknown";
    const referer = headers.get("referer") || "";
    const language = headers.get("accept-language")?.split(",")[0] || "";

    const ip = getIp(request);
    const hashedIp = bcrypt.hashSync(ip, 10);

    const ipInfo = await getIpInfo(ip);

    const parser = new UAParser(userAgent);
    const ua = parser.getResult();

    const clickEvent = {
      timestamp: new Date(),

      ip,
      hashedIp,

      country: ipInfo?.country || "unknown",
      countryCode: ipInfo?.country || "unknown",
      region: ipInfo?.region || "unknown",
      city: ipInfo?.city || "unknown",

      lat: ipInfo?.loc ? Number(ipInfo.loc.split(",")[0]) : null,
      lon: ipInfo?.loc ? Number(ipInfo.loc.split(",")[1]) : null,

      userAgent,

      browser: ua.browser.name || "unknown",
      browserVersion: ua.browser.version || "unknown",
      os: ua.os.name || "unknown",
      osVersion: ua.os.version || "unknown",
      device: ua.device.type || "desktop",
      deviceBrand: ua.device.vendor || "unknown",

      isp: ipInfo?.org || "unknown",
      connectionType: "unknown",

      referrer: referer,
      refererDomain: getRefererDomain(referer),
      landingPage: shortUrl.originalUrl,

      isFirstVisit: false,
      isUnique: false,
      sessionId: hashedIp.slice(0, 16),

      language,
      timezone: ipInfo?.timezone || "unknown",

      isBot: isBot(userAgent),
      botName: isBot(userAgent) ? "detected-bot" : "",

      isVpn: false,
      isProxy: false,
      threatLevel: "low",

      responseTime: Date.now(),

      redirectStatus: 302,

      metadata: new Map([
        ["ipInfoRaw", JSON.stringify(ipInfo || {})],
      ]),
    };

    shortUrl.clicks += 1;
    shortUrl.clickHistory.push(clickEvent);

    await shortUrl.save();

    return NextResponse.redirect(shortUrl.originalUrl, 302);
  } catch (error) {
    console.log("Error:", error);

    return NextResponse.json(
      { message: "Error processing redirect" },
      { status: 500 }
    );
  }
}
