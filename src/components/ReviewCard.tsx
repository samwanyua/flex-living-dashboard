import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import ReviewApprovalToggle from "./ReviewApprovalToggle";

interface ReviewCategory {
  category: string;
  rating: number;
}

interface ReviewCardProps {
  id: number;
  publicReview: string;
  guestName: string;
  listingName: string;
  submittedAt: string;
  rating: number | null;
  reviewCategory: ReviewCategory[];
  channel?: string;
  approved: boolean;
  onToggleApproval: () => void;
}

export default function ReviewCard({
  publicReview,
  guestName,
  listingName,
  submittedAt,
  rating,
  reviewCategory,
  channel,
  approved,
  onToggleApproval,
}: ReviewCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        {/* Review text */}
        <Typography variant="body1" gutterBottom>
          “{publicReview}”
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Guest & property */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Guest:
          </Typography>
          <Typography variant="body2">{guestName}</Typography>

          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
            Property:
          </Typography>
          <Typography variant="body2">{listingName}</Typography>
        </Box>

        {/* Rating */}
        {rating !== null && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Overall Rating:
            </Typography>
            <Typography variant="body2">{rating}/10</Typography>
          </Box>
        )}

        {/* Categories */}
        {reviewCategory?.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Categories:
            </Typography>
            {reviewCategory.map((cat) => (
              <Typography key={cat.category} variant="body2">
                {cat.category}: {cat.rating}/10
              </Typography>
            ))}
          </Box>
        )}

        {/* Channel + Date */}
        <Box sx={{ mt: 2 }}>
          {channel && (
            <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
              Channel: {channel}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            {new Date(submittedAt).toLocaleDateString()}
          </Typography>
        </Box>

        {/* Approval toggle */}
        <Box sx={{ mt: 3 }}>
          <ReviewApprovalToggle approved={approved} onChange={onToggleApproval} />
        </Box>
      </CardContent>
    </Card>
  );
}
