"use client";

import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Paper, Divider } from "@mui/material";
import mockReviewsJson from "@/data/mockReviews.json";

type Review = {
  id: number;
  publicReview: string;
  rating: number | null;
  listingName: string;
  reviewCategory: { category: string; rating: number }[];
};

type PropertyReviews = {
  listingName: string;
  reviews: Review[];
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyReviews[]>([]);

  useEffect(() => {
    const mockReviews = (mockReviewsJson as any).default ?? mockReviewsJson;
    const data: Review[] = mockReviews?.result ?? [];

    // Get approvals from localStorage
    const saved = localStorage.getItem("reviewApprovals");
    const approvals: { [key: number]: boolean } = saved ? JSON.parse(saved) : {};

    // Filter only approved reviews
    const approvedReviews = data.filter(r => approvals[r.id]);

    // Group by listingName
    const grouped: { [key: string]: Review[] } = {};
    approvedReviews.forEach(r => {
      if (!grouped[r.listingName]) grouped[r.listingName] = [];
      grouped[r.listingName].push(r);
    });

    // Convert to array
    const propsArray: PropertyReviews[] = Object.entries(grouped).map(([listingName, reviews]) => ({
      listingName,
      reviews,
    }));

    setProperties(propsArray);
  }, []);

  if (properties.length === 0) {
    return <Typography variant="h6" sx={{ p: 4 }}>No approved reviews available.</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Properties & Approved Reviews
      </Typography>

      {/* Horizontal carousel */}
      <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 2 }}>
        {properties.map((property) => (
          <Card key={property.listingName} sx={{ minWidth: 300, flex: "0 0 auto" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {property.listingName}
              </Typography>
              <Divider sx={{ my: 1 }} />
              {property.reviews.map((review, idx) => (
                <Paper key={review.id} sx={{ p: 1, mb: 1 }}>
                  <Typography variant="subtitle2">
                    {review.rating ?? "N/A"} ⭐
                  </Typography>
                  <Typography variant="body2">{review.publicReview}</Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
