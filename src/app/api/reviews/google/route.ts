// app/api/reviews/google/route.ts
import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;

const PLACE_IDS = [
  "ChIJLU7jZClu5kcR4PcOOO6p3I0", // Eiffel Tower
  "ChIJPTacEpBQwokRKwIlDXelxkA", // Statue of Liberty
  "ChIJ3S-JXmauEmsRUcIaWtf4MzE", // Sydney Opera House
  "ChIJRcbZaklDXz4RYlEphFBu5r0", // Burj Khalifa
];

export async function GET() {
  try {
    console.log("/api/reviews/google hit");

    if (!API_KEY) {
      return NextResponse.json({ fallback: true });
    }

    const allReviews: any[] = [];

    for (const placeId of PLACE_IDS) {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.error_message) {
        console.warn(`⚠️ API error for ${placeId}: ${data.error_message}`);
        

        return NextResponse.json({ fallback: true, error: data.error_message });
      }

      if (data.result?.reviews) {
        allReviews.push(...data.result.reviews);
      }
    }

    return NextResponse.json(allReviews.slice(0, 12));
  } catch (error) {
    console.error(" Error fetching Google reviews:", error);
    return NextResponse.json({ fallback: true, error: "Server fetch failed" });
  }
}
