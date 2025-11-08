"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Card, CardContent, CardHeader } from "./card";
import Image from "next/image";
import type { Review } from "@/lib/social";
import { likeReview } from "@/lib/social";

interface ReviewsListProps {
  reviews: Review[];
  onReviewLike?: (reviewId: string) => void;
}

export function ReviewsList({ reviews, onReviewLike }: ReviewsListProps) {
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());

  const handleLike = (reviewId: string) => {
    if (!likedReviews.has(reviewId)) {
      likeReview(reviewId);
      setLikedReviews(new Set([...likedReviews, reviewId]));
      onReviewLike?.(reviewId);
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={
                  review.userAvatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.userName}`
                }
                alt={review.userName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold truncate">{review.userName}</h4>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed">{review.comment}</p>

            {review.images && review.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {review.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-40 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`Review image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(review.id)}
                disabled={likedReviews.has(review.id)}
                className="gap-2"
              >
                <ThumbsUp
                  className={`w-4 h-4 ${
                    likedReviews.has(review.id)
                      ? "fill-current text-primary"
                      : ""
                  }`}
                />
                <span>
                  {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
                </span>
              </Button>

              <div className="flex gap-1">
                <Badge variant="outline" className="text-xs">
                  {review.world1}
                </Badge>
                <span className="text-xs">×</span>
                <Badge variant="outline" className="text-xs">
                  {review.world2}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export function RatingInput({
  value,
  onChange,
  size = "md",
}: RatingInputProps) {
  const [hover, setHover] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label={`Rate ${starValue} stars`}
          >
            <Star
              className={`${sizeClasses[size]} transition-colors ${
                starValue <= (hover || value)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
