import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Proxy the request to the PyTorch FastAPI Microservice
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8001/predict";
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`PyTorch Engine Error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Recommend API Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to PyTorch AI Engine. Ensure uvicorn is running on port 8000." },
      { status: 500 }
    );
  }
}
