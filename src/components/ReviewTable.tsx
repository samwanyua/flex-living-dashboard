"use client";

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Chip, TextField, MenuItem, IconButton, Menu
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ReviewApprovalToggle from "./ReviewApprovalToggle";
import { useState } from "react";

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
  ratingFilter: string;
  setRatingFilter: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  sortKey: string;
  setSortKey: (val: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (val: "asc" | "desc") => void;
  onToggleApproval: (id: number) => void;
}

export default function ReviewTable({
  reviews,
  ratingFilter,
  setRatingFilter,
  categoryFilter,
  setCategoryFilter,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
  onToggleApproval
}: ReviewTableProps) {

  const allCategories = Array.from(
    new Set(reviews.flatMap((r) => r.reviewCategory.map((c) => c.category)))
  );

  // Sort menu state per column
  const [guestMenuAnchor, setGuestMenuAnchor] = useState<null | HTMLElement>(null);
  const [dateMenuAnchor, setDateMenuAnchor] = useState<null | HTMLElement>(null);

  const handleSortClick = (setter: (val: "asc" | "desc") => void, anchorSetter: (el: HTMLElement | null) => void) => (event: React.MouseEvent<HTMLElement>) => {
    anchorSetter(event.currentTarget);
  };

  const handleSortSelect = (key: string, order: "asc" | "desc", anchorSetter: (el: HTMLElement | null) => void) => {
    setSortKey(key);
    setSortOrder(order);
    anchorSetter(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>

            {/* Guest Column */}
            <TableCell>
              Guest
              <IconButton
                size="small"
                onClick={handleSortClick(setSortOrder, setGuestMenuAnchor)}
              >
                <SortIcon fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={guestMenuAnchor}
                open={Boolean(guestMenuAnchor)}
                onClose={() => setGuestMenuAnchor(null)}
              >
                <MenuItem onClick={() => handleSortSelect("guestName", "asc", setGuestMenuAnchor)}>A → Z</MenuItem>
                <MenuItem onClick={() => handleSortSelect("guestName", "desc", setGuestMenuAnchor)}>Z → A</MenuItem>
              </Menu>
            </TableCell>

            {/* Property Column */}
            <TableCell>Property</TableCell>

           

            {/* Date Column */}
            <TableCell>
              Date
              <IconButton
                size="small"
                onClick={handleSortClick(setSortOrder, setDateMenuAnchor)}
              >
                <SortIcon fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={dateMenuAnchor}
                open={Boolean(dateMenuAnchor)}
                onClose={() => setDateMenuAnchor(null)}
              >
                <MenuItem onClick={() => handleSortSelect("submittedAt", "asc", setDateMenuAnchor)}>Oldest</MenuItem>
                <MenuItem onClick={() => handleSortSelect("submittedAt", "desc", setDateMenuAnchor)}>Newest</MenuItem>
              </Menu>
            </TableCell>

            {/* Rating Column */}
            <TableCell>
              <TextField
                select
                size="small"
                label="Rating"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                sx={{ minWidth: 80 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="5">5 ★ & up</MenuItem>
                <MenuItem value="4">4 ★ & up</MenuItem>
                <MenuItem value="3">3 ★ & up</MenuItem>
              </TextField>
            </TableCell>

            {/* Categories Column */}
            <TableCell>
              <TextField
                select
                size="small"
                label="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="">All</MenuItem>
                {allCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</MenuItem>
                ))}
              </TextField>
            </TableCell>

            {/* Review Column */}
            <TableCell>Review</TableCell>

            {/* Approval Column */}
            <TableCell>Approval</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reviews.map((r, index) => (
            <TableRow key={r.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{r.guestName}</TableCell>
              <TableCell>{r.listingName}</TableCell>
              <TableCell>{new Date(r.submittedAt).toLocaleDateString()}</TableCell>
              <TableCell>{r.rating ?? "N/A"}</TableCell>
              <TableCell>
                {r.reviewCategory.map((c) => (
                  <Chip key={c.category} label={`${c.category}: ${c.rating}`} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                ))}
              </TableCell>
              <TableCell>{r.publicReview}</TableCell>
              <TableCell>
                <ReviewApprovalToggle approved={r.approved} onToggle={() => onToggleApproval(r.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
