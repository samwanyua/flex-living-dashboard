import { NextResponse } from "next/server";
import mockData from "@/data/mockReviews.json";

// ⚡ GET /api/reviews/hostaway?id=PROPERTY_ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const propertyId = searchParams.get("id");

  if (!propertyId) {
    return NextResponse.json({ error: "Missing property ID" }, { status: 400 });
  }

  try {
    // Access the actual array
    const reviewsArray = mockData.result;

    const reviews = reviewsArray
      .filter((r: any) => r.listingId?.toString() === propertyId)
      .map((r: any) => ({
        id: r.id,
        comment: r.publicReview,
        rating: r.rating ?? null,
        categories: r.reviewCategory || [],
        channel: "Hostaway",
        propertyId: r.listingId,
        listingName: r.listingName,
        guestName: r.guestName,
        date: r.submittedAt,
      }));

    return NextResponse.json(reviews);
  } catch (err) {
    console.error("Error reading mock reviews:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
