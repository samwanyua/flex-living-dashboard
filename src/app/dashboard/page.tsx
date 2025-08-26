"use client";

import { useEffect, useState, useMemo } from "react";
import { Container, Typography, Box, MenuItem, TextField, Paper } from "@mui/material";
import ReviewStats from "@/components/ReviewStats";
import ReviewTable from "@/components/ReviewTable";
import mockReviews from "@/data/mockReviews.json";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

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
  approved?: boolean;
}

export default function DashboardPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [sortKey, setSortKey] = useState<keyof Review>("submittedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Load and normalize data
  useEffect(() => {
    const normalized = mockReviews.result.map((r: any) => ({
      ...r,
      approved: false,
    }));

    const saved = localStorage.getItem("reviewApprovals"); 
    if (saved) { 
      const approvals = JSON.parse(saved); 
      normalized.forEach(r => {
        if (approvals[r.id] !== undefined) r.approved = approvals[r.id]; 
      });
    }
    setReviews(normalized);
  }, []);



   const toggleApproval = (id: number) => {
    setReviews((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r));

     
      const approvals: { [key: number]: boolean } = {}; 
      updated.forEach(r => { approvals[r.id] = r.approved }); 
      localStorage.setItem("reviewApprovals", JSON.stringify(approvals)); 

      return updated;
    });
  };

  // Filtering
  const filteredReviews = reviews.filter((r) => {
    let matches = true;
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

  // Per-property performance
  const propertyStats = useMemo(() => {
    const stats: { [key: string]: { total: number; approved: number; ratingSum: number; ratingCount: number } } = {};
    filteredReviews.forEach((r) => {
      const listing = r.listingName;
      if (!stats[listing]) stats[listing] = { total: 0, approved: 0, ratingSum: 0, ratingCount: 0 };
      stats[listing].total += 1;
      if (r.approved) stats[listing].approved += 1;
      if (r.rating !== null) {
        stats[listing].ratingSum += r.rating;
        stats[listing].ratingCount += 1;
      }
    });
    return Object.entries(stats).map(([listing, s]) => ({
      listing,
      total: s.total,
      approved: s.approved,
      avgRating: s.ratingCount ? s.ratingSum / s.ratingCount : 0,
    }));
  }, [filteredReviews]);

  // Trend insights: average rating over time (monthly)
  const trendData = useMemo(() => {
    const grouped: { [key: string]: { sum: number; count: number } } = {};
    filteredReviews.forEach((r) => {
      if (r.rating !== null) {
        const month = new Date(r.submittedAt).toLocaleString("default", { month: "short", year: "numeric" });
        if (!grouped[month]) grouped[month] = { sum: 0, count: 0 };
        grouped[month].sum += r.rating;
        grouped[month].count += 1;
      }
    });
    return Object.entries(grouped)
      .map(([month, data]) => ({ month, avgRating: data.sum / data.count }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  }, [filteredReviews]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Manager Dashboard
      </Typography>

      {/* Top-level stats */}
      <ReviewStats total={filteredReviews.length} avgRating={avgRating} approvedCount={approvedCount} />

      {/* Per-property performance */}
      {/* <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
        {propertyStats.map((p) => (
          <Box key={p.listing} sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight="bold">{p.listing}</Typography>
            <Typography>Total Reviews: {p.total}</Typography>
            <Typography>Average Rating: {p.avgRating.toFixed(1)}</Typography>
            <Typography>Approved Reviews: {p.approved}</Typography>
          </Box>
        ))}
      </Box> */}

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
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
            <MenuItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Trend Insights */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Average Rating Over Time</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line type="monotone" dataKey="avgRating" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Review Table */}
      <Box sx={{ mt: 2 }}>
        <ReviewTable
          reviews={sortedReviews}
          ratingFilter={rating}
          setRatingFilter={setRating}
          categoryFilter={category}
          setCategoryFilter={setCategory}
          sortKey={sortKey}
          setSortKey={setSortKey}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onToggleApproval={toggleApproval}
        />
      </Box>
    </Container>
  );
}
