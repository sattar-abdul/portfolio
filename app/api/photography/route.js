import { NextResponse } from "next/server";

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        expression: "resource_type:image AND folder:portfolio/photography",
        sort_by: [{ created_at: "desc" }],
        max_results: 50,
      }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json({ error: errorText }, { status: res.status });
  }

  const data = await res.json();

  const images = (data.resources || []).map((img) => ({
    asset_id: img.asset_id,
    width: img.width,
    height: img.height,
    secure_url: img.secure_url,
  }));

  return NextResponse.json(images);
}
