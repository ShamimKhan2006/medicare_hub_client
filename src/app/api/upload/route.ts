import { NextRequest, NextResponse } from "next/server";

// POST /api/upload
// Expects multipart/form-data with a "file" field.
// Uploads the image to ImgBB and returns { url: string }.
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "IMGBB_API_KEY is not set on the server" },
        { status: 500 }
      );
    }

    const incomingForm = await req.formData();
    const file = incomingForm.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Basic guardrails: only allow images, cap size at 5MB
    const MAX_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }
    if (file.type && !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    // ImgBB expects the image as base64 in a form field named "image"
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const imgbbForm = new FormData();
    imgbbForm.append("image", base64);

    const imgbbRes = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: imgbbForm,
      }
    );

    const data = await imgbbRes.json();

    if (!imgbbRes.ok || !data?.success) {
      return NextResponse.json(
        { error: data?.error?.message || "Upload to ImgBB failed" },
        { status: 502 }
      );
    }

    // data.data.url -> direct image URL, safe to store as user.image
    return NextResponse.json({ url: data.data.url as string });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}