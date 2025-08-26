"use client";

import Grid from '@mui/material/Unstable_Grid2'; // <-- updated import
import { Card, CardContent, Typography } from "@mui/material";

interface ReviewStatsProps {
  total: number;
  avgRating: number;
  approvedCount: number;
}

export default function ReviewStats({
  total,
  avgRating,
  approvedCount,
}: ReviewStatsProps) {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Reviews</Typography>
            <Typography variant="h4" fontWeight="bold">{total}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Average Rating</Typography>
            <Typography variant="h4" fontWeight="bold">
              {avgRating > 0 ? avgRating.toFixed(1) : "N/A"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Approved Reviews</Typography>
            <Typography variant="h4" fontWeight="bold">{approvedCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
