import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto-js";

const BOT_TOKEN = process.env.BOT_TOKEN;

function validateTelegramWebAppData(initData: string) {
  const urlParams = new URLSearchParams(initData);
  const hash = urlParams.get("hash");
  urlParams.delete("hash");

  // Sort in alphabetical order
  const paramArray = Array.from(urlParams.entries());
  paramArray.sort(([a], [b]) => a.localeCompare(b));

  // Create data check string
  const dataCheckString = paramArray
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  // Create secret key
  const secretKey = crypto.HmacSHA256(BOT_TOKEN!, "WebAppData");

  // Calculate hash
  const calculatedHash = crypto
    .HmacSHA256(dataCheckString, secretKey)
    .toString(crypto.enc.Hex);

  return calculatedHash === hash;
}

export async function POST(request: NextRequest) {
  try {
    const { initData } = await request.json();

    const isValid = validateTelegramWebAppData(initData);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid authentication" },
        { status: 401 }
      );
    }

    const data = new URLSearchParams(initData);
    const user = JSON.parse(data.get("user") || "{}");

    return NextResponse.json({ user });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid authentication" },
      { status: 401 }
    );
  }
}
