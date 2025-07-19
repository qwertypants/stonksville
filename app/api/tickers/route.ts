import { NextResponse } from "next/server";
import { API_URL } from "@/lib/constants";

export async function GET() {
  const headers = new Headers();
  headers.append("accept", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${API_URL}/quant/tickers?us_market_only=true`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching tickers:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickers" },
      { status: 500 },
    );
  }
}
