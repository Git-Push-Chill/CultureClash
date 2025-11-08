export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  mealId: string;
  mealName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  likes: number;
  world1: string;
  world2: string;
}

export interface UserRating {
  mealId: string;
  mealName: string;
  rating: number;
  userId: string;
  timestamp: Date;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "review-1",
    userId: "user-1",
    userName: "Sarah M.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    mealId: "52771",
    mealName: "Spicy Arrabiata Penne",
    rating: 5,
    comment:
      "Absolutely delicious! The combination of Italian pasta with a spicy kick was perfect. Made it for my family and everyone loved it!",
    images: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    ],
    createdAt: new Date("2025-11-05"),
    likes: 12,
    world1: "Italian",
    world2: "Mexican",
  },
  {
    id: "review-2",
    userId: "user-2",
    userName: "James K.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    mealId: "52780",
    mealName: "Katsu Chicken Curry",
    rating: 4,
    comment:
      "Great fusion dish! The crispy chicken with curry sauce is amazing. Would recommend trying it in Tokyo if you get the chance.",
    createdAt: new Date("2025-11-03"),
    likes: 8,
    world1: "Japanese",
    world2: "Indian",
  },
  {
    id: "review-3",
    userId: "user-3",
    userName: "Emily R.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    mealId: "52781",
    mealName: "Teriyaki Chicken",
    rating: 5,
    comment:
      "This is my go-to recipe now! Easy to make and tastes authentic. The teriyaki sauce recipe is spot on.",
    images: [
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1625937329935-f85e4c5e3307?w=400&h=300&fit=crop",
    ],
    createdAt: new Date("2025-11-01"),
    likes: 15,
    world1: "Japanese",
    world2: "American",
  },
];

// Get reviews from localStorage or use mock data
export function getReviews(world1?: string, world2?: string): Review[] {
  try {
    const stored = localStorage.getItem("cultureClashReviews");
    const reviews = stored ? JSON.parse(stored) : mockReviews;

    if (world1 && world2) {
      return reviews.filter(
        (r: Review) =>
          (r.world1 === world1 && r.world2 === world2) ||
          (r.world1 === world2 && r.world2 === world1)
      );
    }

    return reviews;
  } catch (error) {
    console.error("Error loading reviews:", error);
    return mockReviews;
  }
}

export function getReviewsByMeal(mealId: string): Review[] {
  const reviews = getReviews();
  return reviews.filter((r) => r.mealId === mealId);
}

export function addReview(
  review: Omit<Review, "id" | "createdAt" | "likes">
): Review {
  const newReview: Review = {
    ...review,
    id: `review-${Date.now()}`,
    createdAt: new Date(),
    likes: 0,
  };

  try {
    const reviews = getReviews();
    reviews.unshift(newReview);
    localStorage.setItem("cultureClashReviews", JSON.stringify(reviews));
  } catch (error) {
    console.error("Error saving review:", error);
  }

  return newReview;
}

export function likeReview(reviewId: string): void {
  try {
    const reviews = getReviews();
    const review = reviews.find((r) => r.id === reviewId);
    if (review) {
      review.likes += 1;
      localStorage.setItem("cultureClashReviews", JSON.stringify(reviews));
    }
  } catch (error) {
    console.error("Error liking review:", error);
  }
}

export function getMealRating(mealId: string): {
  average: number;
  count: number;
} {
  const reviews = getReviewsByMeal(mealId);
  if (reviews.length === 0) return { average: 0, count: 0 };

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
  };
}

// User rating functions
export function getUserRating(mealId: string, userId: string): number | null {
  try {
    const stored = localStorage.getItem("userRatings");
    if (!stored) return null;

    const ratings: UserRating[] = JSON.parse(stored);
    const rating = ratings.find(
      (r) => r.mealId === mealId && r.userId === userId
    );
    return rating ? rating.rating : null;
  } catch (error) {
    console.error("Error getting user rating:", error);
    return null;
  }
}

export function setUserRating(
  mealId: string,
  mealName: string,
  rating: number,
  userId: string
): void {
  try {
    const stored = localStorage.getItem("userRatings");
    let ratings: UserRating[] = stored ? JSON.parse(stored) : [];

    // Remove existing rating for this meal by this user
    ratings = ratings.filter(
      (r) => !(r.mealId === mealId && r.userId === userId)
    );

    // Add new rating
    ratings.push({
      mealId,
      mealName,
      rating,
      userId,
      timestamp: new Date(),
    });

    localStorage.setItem("userRatings", JSON.stringify(ratings));
  } catch (error) {
    console.error("Error saving rating:", error);
  }
}
