"use client";

import { use } from "react"; 
import { useEffect, useState } from "react";

type Review = {
  id: number;
  comment: string;
  rating: number;
  propertyId: string;
};

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`/api/reviews/hostaway?id=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Property {id}</h2>
      <h3>Guest Reviews</h3>
      {reviews.length === 0 && <p>No approved reviews yet.</p>}
      {reviews.map((r) => (
        <div key={r.id} style={{ marginBottom: 12 }}>
          <p>
            <strong>Rating:</strong> {r.rating} ⭐
          </p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
