import { Grid as MuiGrid} from "@mui/material";
import ReviewCard from "./ReviewCard";

const Grid: any = MuiGrid;

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

interface ReviewListProps {
  reviews: Review[];
  onToggleApproval: (id: number) => void;
}

export default function ReviewList({ reviews, onToggleApproval }: ReviewListProps) {
  return (
    <Grid container spacing={3}>
      {reviews.map((review) => (
        <Grid item xs={12} sm={6} md={4} key={review.id}>
          <ReviewCard
            {...review}
            onToggleApproval={() => onToggleApproval(review.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
