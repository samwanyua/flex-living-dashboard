// src/app/components/ReviewTable.tsx
"use client";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Switch,
  Typography,
} from "@mui/material";

interface ReviewCategory {
  category: string;
  rating: number;
}

interface Review {
  id: number;
  publicReview: string;
  guestName: string;
  listingName: string;
  submittedAt: string;
  rating: number | null;
  reviewCategory: ReviewCategory[];
  channel?: string;
  approved: boolean;
}

interface ReviewTableProps {
  reviews: Review[];
  onToggleApproval: (id: number) => void;
}

export default function ReviewTable({ reviews, onToggleApproval }: ReviewTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Guest</TableCell>
            <TableCell>Property</TableCell>
            <TableCell>Channel</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Approval</TableCell>
            <TableCell>Review</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.guestName}</TableCell>
              <TableCell>{r.listingName}</TableCell>
              <TableCell>{r.channel}</TableCell>
              <TableCell>{new Date(r.submittedAt).toLocaleDateString()}</TableCell>
              <TableCell>{r.rating ?? "N/A"}</TableCell>
              <TableCell>
                {r.reviewCategory.map((cat) => (
                  <Typography key={cat.category} variant="body2">
                    {cat.category}: {cat.rating}
                  </Typography>
                ))}
              </TableCell>
              <TableCell>
                <Switch
                  checked={r.approved}
                  onChange={() => onToggleApproval(r.id)}
                />
              </TableCell>
              <TableCell>{r.publicReview}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
