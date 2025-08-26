"use client";

import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import mockReviewsJson from "@/data/mockReviews.json";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Review = {
  id: number;
  publicReview: string;
  rating: number | null;
  listingName: string;
  guestName?: string;
  reviewCategory: { category: string; rating: number }[];
};

export default function PropertiesPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const mockReviews = (mockReviewsJson as any).default ?? mockReviewsJson;
    const data: Review[] = mockReviews?.result ?? [];

    // Get approvals from localStorage
    const saved = localStorage.getItem("reviewApprovals");
    const approvals: { [key: number]: boolean } = saved ? JSON.parse(saved) : {};

    // Filter only approved reviews
    const approvedReviews = data.filter(r => approvals[r.id]);

    setReviews(approvedReviews);
  }, []);

  if (reviews.length === 0) {
    return <Typography variant="h6" sx={{ p: 4 }}>No approved reviews available.</Typography>;
  }

  const review = reviews[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ p: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Section Header */}
      <Box sx={{ textAlign: "center", mb: 6, maxWidth: 700 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          What Our Clients Think
        </Typography>
        <Typography variant="body1" >
          Hear from the companies we work with. Discover how our flexible corporate rental solutions
          help them simplify relocations, support staff, and secure reliable short- and long-term housing with ease.
        </Typography>
      </Box>

      {/* Review Section */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Prev Button */}
        <IconButton onClick={handlePrev}>
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>

        {/* Review Card */}
        <Card sx={{ maxWidth: 600, minWidth: 450, mx: 3, p: 2 }}>
          <CardContent sx={{ textAlign: "center" }}>
            {/* Person Icon */}
            <PersonIcon sx={{ fontSize: 60, color: "black", mb: 2 }} />

            {/* Stars */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              {review.rating ? (
                Array.from({ length: review.rating }, (_, i) => (
                  <StarIcon key={i} sx={{ fontSize: 28, color: "black" }} />
                ))
              ) : (
                <Typography variant="subtitle1">N/A</Typography>
              )}
            </Box>

            {/* Review Text */}
            <Typography variant="h6" sx={{ fontStyle: "italic", mb: 2 }}>
              "{review.publicReview}"
            </Typography>

            {/* Guest Name */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              {review.guestName ?? "Anonymous Guest"}
            </Typography>

            {/* Property Name */}
            <Typography variant="body2" color="text.secondary">
              {review.listingName}
            </Typography>
          </CardContent>
        </Card>

        {/* Next Button */}
        <IconButton onClick={handleNext}>
          <NavigateNextIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
