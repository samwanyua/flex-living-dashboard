"use client";

import { Switch, FormControlLabel } from "@mui/material";

interface ReviewApprovalToggleProps {
  approved: boolean;
  onToggle: () => void;
}

export default function ReviewApprovalToggle({
  approved,
  onToggle,
}: ReviewApprovalToggleProps) {
  return (
    <FormControlLabel
      control={<Switch checked={approved} onChange={onToggle} />}
      label={approved ? "Approved" : "Pending"}
    />
  );
}
