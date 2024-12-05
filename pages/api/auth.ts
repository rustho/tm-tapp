import type { NextApiRequest, NextApiResponse } from "next";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { initData } = req.body;

  try {
    const isValid = validateTelegramWebAppData(initData);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid authentication" });
    }

    const data = new URLSearchParams(initData);
    const user = JSON.parse(data.get("user") || "{}");

    return res.status(200).json({ user });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return res.status(401).json({ message: "Invalid authentication" });
  }
}
