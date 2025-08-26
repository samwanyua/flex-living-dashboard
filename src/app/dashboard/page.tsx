"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Review = {
  id: number;
  listingName: string;
  type: string;
  rating: number | null;
  categories: { category: string; rating: number }[];
  guestName: string;
  submittedAt: string;
  comment: string;
  approved?: boolean;
};

export default function DashboardPage() {
  const [rows, setRows] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/api/reviews/hostaway")
      .then((res) => res.json())
      .then((data) => setRows(data.reviews));
  }, []);

  const columns: GridColDef[] = [
    { field: "listingName", headerName: "Property", flex: 1 },
    { field: "guestName", headerName: "Guest", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
    { field: "comment", headerName: "Comment", flex: 2 },
    { field: "submittedAt", headerName: "Date", flex: 1 },
    { field: "approved", headerName: "Approved", type: "boolean", flex: 1 },
  ];

  return (
    <div style={{ height: 600, width: "100%", padding: 20 }}>
      <h2>Manager Dashboard</h2>
      <DataGrid rows={rows} columns={columns} getRowId={(r) => r.id} />
    </div>
  );
}
