"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import ReviewStats from "@/components/ReviewStats";
import ReviewFilters from "@/components/ReviewFilters";
import ReviewList from "@/components/ReviewList";
import mockReviews from "@/data/mockReviews.json";

interface Review {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: { category: string; rating: number }[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel?: string;
  approved?: boolean;
}

export default function DashboardPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [channel, setChannel] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    // Load mock data
    const normalized = mockReviews.result.map((r: any) => ({
      ...r,
      channel: r.channel || "airbnb", // default mock channel
      approved: false, // start unapproved
    }));

    setReviews(normalized);
  }, []);

  // Filtering logic
  const filteredReviews = reviews.filter((r) => {
    let matches = true;

    if (channel && r.channel !== channel) matches = false;

    if (rating) {
      const minRating = parseInt(rating, 10);
      if (!r.rating || r.rating < minRating) matches = false;
    }

    return matches;
  });

  // Stats
  const avgRating =
    filteredReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
      (filteredReviews.filter((r) => r.rating !== null).length || 1);

  const approvedCount = reviews.filter((r) => r.approved).length;

  // Toggle approval
  const toggleApproval = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r))
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>

      {/* Stats */}
      <ReviewStats
        total={filteredReviews.length}
        avgRating={avgRating}
        approvedCount={approvedCount}
      />

      {/* Filters */}
      <ReviewFilters
        channel={channel}
        setChannel={setChannel}
        rating={rating}
        setRating={setRating}
      />

      {/* Reviews */}
      <Box sx={{ mt: 4 }}>
        <ReviewList
          reviews={filteredReviews.map((r) => ({
            ...r,
            approved: r.approved || false,
            onToggleApproval: () => toggleApproval(r.id),
          }))}
        />
      </Box>
    </Container>
  );
}
