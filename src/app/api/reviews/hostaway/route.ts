import { NextResponse } from "next/server";
import mockReviews from "@/data/mockReviews.json";

// ⚡ GET /api/reviews/hostaway?id=PROPERTY_ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const propertyId = searchParams.get("id");

  if (!propertyId) {
    return NextResponse.json({ error: "Missing property ID" }, { status: 400 });
  }

  try {
    const reviewsData = (mockReviews as any).result || [];

    const reviews = reviewsData
      .filter((r: any) => r.id?.toString() === propertyId)
      .map((r: any) => ({
        id: r.id,
        comment: r.publicReview,
        rating: r.rating ?? null,
        categories: r.reviewCategory || [],
        channel: "Hostaway",
        propertyId: r.id, // using `id` as propertyId now
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
