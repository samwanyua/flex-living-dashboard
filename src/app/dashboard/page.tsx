"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Box, MenuItem, TextField } from "@mui/material";
import ReviewStats from "@/components/ReviewStats";
import ReviewTable from "@/components/ReviewTable";
import mockReviews from "@/data/mockReviews.json";

interface ReviewCategory {
  category: string;
  rating: number;
}

interface Review {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
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
  const [category, setCategory] = useState("");
  const [sortKey, setSortKey] = useState<keyof Review>("submittedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Load and normalize data
  useEffect(() => {
    const normalized = mockReviews.result.map((r: any) => ({
      ...r,
      channel: r.channel || "airbnb",
      approved: false,
    }));
    setReviews(normalized);
  }, []);

  // Toggle approval
  const toggleApproval = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r))
    );
  };

  // Filtering
  const filteredReviews = reviews.filter((r) => {
    let matches = true;
    if (channel && r.channel !== channel) matches = false;
    if (rating) {
      const minRating = parseInt(rating, 10);
      if (!r.rating || r.rating < minRating) matches = false;
    }
    if (category) {
      const categories = r.reviewCategory.map((c) => c.category.toLowerCase());
      if (!categories.includes(category.toLowerCase())) matches = false;
    }
    return matches;
  });

  // Sorting safely
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const aVal: any = a[sortKey] ?? "";
    const bVal: any = b[sortKey] ?? "";

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    const aNum = Number(aVal);
    const bNum = Number(bVal);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
    }

    return 0;
  });

  // Stats
  const avgRating =
    filteredReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
      (filteredReviews.filter((r) => r.rating !== null).length || 1);
  const approvedCount = reviews.filter((r) => r.approved).length;

  // Get all categories for filter dropdown
  const allCategories = Array.from(
    new Set(reviews.flatMap((r) => r.reviewCategory.map((c) => c.category)))
  );

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
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          select
          label="Filter by Channel"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="airbnb">Airbnb</MenuItem>
          <MenuItem value="booking">Booking.com</MenuItem>
          <MenuItem value="direct">Direct</MenuItem>
        </TextField>

        <TextField
          select
          label="Filter by Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="5">5 ★ & up</MenuItem>
          <MenuItem value="4">4 ★ & up</MenuItem>
          <MenuItem value="3">3 ★ & up</MenuItem>
        </TextField>

        <TextField
          select
          label="Filter by Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {allCategories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sort by"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as keyof Review)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="submittedAt">Date</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="guestName">Guest</MenuItem>
          <MenuItem value="listingName">Property</MenuItem>
        </TextField>

        <TextField
          select
          label="Order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </TextField>
      </Box>

      {/* Review Table */}
      <Box sx={{ mt: 4 }}>
        <ReviewTable reviews={sortedReviews} onToggleApproval={toggleApproval} />
      </Box>
    </Container>
  );
}
