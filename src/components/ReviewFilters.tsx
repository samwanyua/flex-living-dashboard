"use client";

import { Box, TextField, MenuItem } from "@mui/material";

interface ReviewFiltersProps {
  channel: string;
  setChannel: (val: string) => void;
  rating: string;
  setRating: (val: string) => void;
}

export default function ReviewFilters({
  channel,
  setChannel,
  rating,
  setRating,
}: ReviewFiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
      }}
    >
      <TextField
        select
        label="Filter by Channel"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        sx={{ minWidth: 200 }}
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
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="5">5 ★</MenuItem>
        <MenuItem value="4">4 ★ & up</MenuItem>
        <MenuItem value="3">3 ★ & up</MenuItem>
      </TextField>
    </Box>
  );
}
