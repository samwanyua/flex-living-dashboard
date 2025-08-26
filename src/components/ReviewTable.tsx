"use client";

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip
} from "@mui/material";
import ReviewApprovalToggle from "./ReviewApprovalToggle";

interface ReviewCategory {
  category: string;
  rating: number;
}

interface Review {
  id: number;
  guestName: string;
  listingName: string;
  channel?: string;
  submittedAt: string;
  rating: number | null;
  reviewCategory: ReviewCategory[];
  publicReview: string;
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
                {r.reviewCategory.map((c) => (
                  <Chip
                    key={c.category}
                    label={`${c.category}: ${c.rating}`}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </TableCell>
              <TableCell>{r.publicReview}</TableCell>
              <TableCell>
                <ReviewApprovalToggle
                  approved={r.approved}
                  onToggle={() => onToggleApproval(r.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
