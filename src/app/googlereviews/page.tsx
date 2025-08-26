"use client";

import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, IconButton, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type GoogleReview = {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time_description?: string;
};

export default function GoogleReviewsPage() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("Fetching Google reviews from /api/reviews/google...");
        const res = await fetch("/api/reviews/google");

        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Raw data from API:", data);

        if (Array.isArray(data)) {
          console.log("Setting reviews:", data);
          setReviews(data);
        } else {
          console.warn("Unexpected API response:", data);
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching Google reviews:", error);
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) {
  console.log("No Google reviews available to display.");
  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 6, p: 4, textAlign: "center", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          No Google reviews found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reviews could not be fetched at this time. Please check back later.
        </Typography>
      </CardContent>
    </Card>
  );
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
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Google Reviews
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See what guests are saying about our properties directly from Google.
        </Typography>
      </Box>

      {/* Review Section */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <IconButton onClick={handlePrev}>
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>

        <Card sx={{ maxWidth: 600, minWidth: 450, mx: 3, p: 2 }}>
          <CardContent sx={{ textAlign: "center", position: "relative" }}>
            {/* Decorative Quote */}
            <Typography
              component="span"
              sx={{
                position: "absolute",
                top: -40,
                left: -30,
                fontSize: 100,
                color: "lightgray",
                fontWeight: "bold",
                userSelect: "none",
              }}
            >
              "
            </Typography>

            {/* Reviewer Avatar */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Avatar
                src={review.profile_photo_url}
                alt={review.author_name}
                sx={{ width: 100, height: 100 }}
              />
            </Box>

            {/* Stars */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  sx={{
                    fontSize: 28,
                    color: review.rating && i < review.rating ? "gold" : "gray",
                    opacity: review.rating && i < review.rating ? 1 : 0.3,
                  }}
                />
              ))}
            </Box>

            {/* Review Text */}
            <Typography variant="h6" sx={{ fontStyle: "italic", mb: 2 }}>
              "{review.text}"
            </Typography>

            {/* Reviewer Name & Time */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
              {review.author_name}
            </Typography>
            {review.relative_time_description && (
              <Typography variant="body2" color="text.secondary">
                {review.relative_time_description}
              </Typography>
            )}
          </CardContent>
        </Card>

        <IconButton onClick={handleNext}>
          <NavigateNextIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
