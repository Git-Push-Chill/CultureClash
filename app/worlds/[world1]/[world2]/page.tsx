"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getMealsByArea, getIngredients } from "@/lib/api/meals";
import { getBlendedHotels, getBlendedRestaurants } from "@/lib/api/booking";
import { getBlendedExperiences } from "@/lib/api/experiences";
import type { CookingClass, FoodTour } from "@/lib/api/experiences";
import { Meal, Hotel, Restaurant } from "@/lib/types";
import {
  getReviews,
  getReviewsByMeal,
  addReview,
  getMealRating,
  setUserRating,
  getUserRating,
} from "@/lib/social";
import type { Review } from "@/lib/social";
import { ReviewsList, RatingInput } from "@/components/ui/reviews";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Heart,
  ArrowLeft,
  MapPin,
  Star,
  Hotel as HotelIcon,
  UtensilsCrossed,
  ExternalLink,
  Download,
  Share2,
  ChefHat,
  Users,
  Clock,
  Youtube,
  BookOpen,
  MessageSquare,
  Send,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function BlendedWorldPage() {
  const [blendedMeals, setBlendedMeals] = useState<Meal[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cookingClasses, setCookingClasses] = useState<CookingClass[]>([]);
  const [foodTours, setFoodTours] = useState<FoodTour[]>([]);
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>([]);
  const [exploredWorlds, setExploredWorlds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showItinerary, setShowItinerary] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const params = useParams();
  const router = useRouter();
  const world1 = decodeURIComponent(params.world1 as string);
  const world2 = decodeURIComponent(params.world2 as string);
  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId") || `user-${Date.now()}`
      : "anonymous";

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("userId")) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  useEffect(() => {
    loadFromLocalStorage();
    loadBlendedMeals();
    loadReviews();
  }, []);

  const loadReviews = () => {
    const allReviews = getReviews(world1, world2);
    setReviews(allReviews);
  };

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem("bridgeProfile");
    if (stored) {
      const profile = JSON.parse(stored);
      setFavoriteFoods(profile.favoriteFoods || []);
      setExploredWorlds(profile.exploredWorlds || []);
    }
  };

  const saveToLocalStorage = (foods: string[], worlds: string[]) => {
    localStorage.setItem(
      "bridgeProfile",
      JSON.stringify({ favoriteFoods: foods, exploredWorlds: worlds })
    );
  };

  const loadBlendedMeals = async () => {
    setLoading(true);

    try {
      // Fetch meals, hotels, restaurants, and experiences from both worlds in parallel
      const [meals1, meals2, hotelsList, restaurantsList, experiences] =
        await Promise.all([
          getMealsByArea(world1),
          getMealsByArea(world2),
          getBlendedHotels(world1, world2),
          getBlendedRestaurants(world1, world2),
          getBlendedExperiences(world1, world2),
        ]);

      // Blend the results
      const blended = [...meals1.slice(0, 3), ...meals2.slice(0, 3)];
      setBlendedMeals(blended);
      setHotels(hotelsList);
      setRestaurants(restaurantsList);
      setCookingClasses(experiences.cookingClasses);
      setFoodTours(experiences.foodTours);

      // Update explored worlds
      const stored = localStorage.getItem("bridgeProfile");
      const profile = stored
        ? JSON.parse(stored)
        : { favoriteFoods: [], exploredWorlds: [] };
      const newExploredWorlds = Array.from(
        new Set([...(profile.exploredWorlds || []), world1, world2])
      );
      setExploredWorlds(newExploredWorlds);
      saveToLocalStorage(profile.favoriteFoods || [], newExploredWorlds);
    } catch (error) {
      console.error("Error loading blended experience:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (mealName: string) => {
    const newFavorites = favoriteFoods.includes(mealName)
      ? favoriteFoods.filter((f) => f !== mealName)
      : [...favoriteFoods, mealName];
    setFavoriteFoods(newFavorites);
    saveToLocalStorage(newFavorites, exploredWorlds);
  };

  const exportItinerary = () => {
    const itinerary = {
      title: `${world1} × ${world2} Cultural Food Journey`,
      cultures: [world1, world2],
      meals: blendedMeals.map((m) => ({ name: m.strMeal, cuisine: m.strArea })),
      hotels: hotels.map((h) => ({
        name: h.name,
        location: h.city,
        price: `${h.currency} ${h.price}`,
      })),
      restaurants: restaurants.map((r) => ({
        name: r.name,
        cuisine: r.cuisine.join(", "),
        location: r.city,
      })),
      createdAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(itinerary, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `culture-clash-${world1}-${world2}-itinerary.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareItinerary = async () => {
    const shareData = {
      title: `${world1} × ${world2} Food Journey`,
      text: `Check out this amazing ${world1} and ${world2} cultural food fusion! ${blendedMeals.length} dishes, ${hotels.length} hotels, ${restaurants.length} restaurants to explore.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `${shareData.title}\n${shareData.text}\n${shareData.url}`
      );
      alert("Link copied to clipboard!");
    }
  };

  const handleSubmitReview = () => {
    if (!selectedMeal || newReview.rating === 0 || !newReview.comment.trim()) {
      alert("Please provide a rating and comment");
      return;
    }

    const review = addReview({
      userId: userId,
      userName: `Foodie ${userId.slice(-4)}`,
      mealId: selectedMeal.idMeal,
      mealName: selectedMeal.strMeal,
      rating: newReview.rating,
      comment: newReview.comment,
      world1,
      world2,
    });

    setReviews([review, ...reviews]);
    setNewReview({ rating: 0, comment: "" });
    setShowReviewForm(false);
    setUserRating(
      selectedMeal.idMeal,
      selectedMeal.strMeal,
      newReview.rating,
      userId
    );
  };

  return (
    <div className="min-h-screen" role="main">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <nav
          className="mb-6 flex justify-between items-center flex-wrap gap-4"
          aria-label="Navigation"
        >
          <Link href={`/worlds/${encodeURIComponent(world1)}`}>
            <Button
              variant="outline"
              size="sm"
              aria-label="Choose a different world"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Choose Different World
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={shareItinerary}
              aria-label="Share this itinerary"
            >
              <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportItinerary}
              aria-label="Download itinerary"
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Export
            </Button>
          </div>
        </nav>

        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {world1}
            </span>
            <Sparkles
              className="inline-block w-6 h-6 sm:w-8 sm:h-8 mx-2 sm:mx-4 text-purple-600"
              aria-hidden="true"
            />
            <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {world2}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 drop-shadow-md">
            Your Blended Cultural Experience
          </p>
        </header>

        {loading ? (
          <div className="space-y-8" aria-busy="true">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-96 w-full" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Meals Section */}
            <section className="mb-8" aria-labelledby="meals-heading">
              <h2
                id="meals-heading"
                className="text-2xl sm:text-3xl font-bold mb-4 text-white drop-shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-6 h-6" aria-hidden="true" />
                Fusion Dishes
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {blendedMeals.map((meal) => (
                  <Card key={meal.idMeal} className="overflow-hidden">
                    <div
                      className="relative h-48 w-full cursor-pointer"
                      onClick={() => setSelectedMeal(meal)}
                    >
                      <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                      <Badge
                        className="absolute top-2 right-2"
                        variant={
                          meal.strArea === world1 ? "default" : "secondary"
                        }
                      >
                        {meal.strArea}
                      </Badge>
                      {meal.strYoutube && (
                        <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
                          <Youtube
                            className="w-3 h-3 mr-1"
                            aria-hidden="true"
                          />
                          Video
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span
                          className="cursor-pointer hover:text-primary"
                          onClick={() => setSelectedMeal(meal)}
                        >
                          {meal.strMeal}
                        </span>
                        <Button
                          size="sm"
                          variant={
                            favoriteFoods.includes(meal.strMeal)
                              ? "default"
                              : "outline"
                          }
                          onClick={() => toggleFavorite(meal.strMeal)}
                          aria-label={`${
                            favoriteFoods.includes(meal.strMeal)
                              ? "Remove from"
                              : "Add to"
                          } favorites`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favoriteFoods.includes(meal.strMeal)
                                ? "fill-current"
                                : ""
                            }`}
                            aria-hidden="true"
                          />
                        </Button>
                      </CardTitle>
                      <CardDescription>{meal.strCategory}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Ingredients:</h4>
                        <div className="flex flex-wrap gap-1">
                          {getIngredients(meal)
                            .slice(0, 5)
                            .map((ingredient, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {ingredient}
                              </Badge>
                            ))}
                        </div>
                        {meal.strTags && (
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1">
                              {meal.strTags.split(",").map((tag, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag.trim()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => setSelectedMeal(meal)}
                        >
                          <BookOpen
                            className="w-4 h-4 mr-2"
                            aria-hidden="true"
                          />
                          View Full Recipe
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Hotels Section */}
            {hotels.length > 0 && (
              <section className="mb-8" aria-labelledby="hotels-heading">
                <h2
                  id="hotels-heading"
                  className="text-2xl sm:text-3xl font-bold mb-4 text-white drop-shadow-lg flex items-center gap-2"
                >
                  <HotelIcon className="w-6 h-6" aria-hidden="true" />
                  Stay & Experience
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {hotels.map((hotel) => (
                    <Card
                      key={hotel.id}
                      className="overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={hotel.image || "/placeholder-hotel.jpg"}
                          alt={`${hotel.name} in ${hotel.city}`}
                          fill
                          className="object-cover"
                        />
                        {hotel.rating && (
                          <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                            <Star
                              className="w-3 h-3 mr-1 fill-current"
                              aria-hidden="true"
                            />
                            {hotel.rating}
                          </Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{hotel.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" aria-hidden="true" />
                          {hotel.city}, {hotel.country}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">{hotel.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold">
                            {hotel.currency} {hotel.price}
                            <span className="text-sm font-normal text-muted-foreground">
                              /night
                            </span>
                          </span>
                          <a
                            href={hotel.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Book ${hotel.name} on Booking.com`}
                          >
                            <Button size="sm">
                              Book Now
                              <ExternalLink
                                className="w-4 h-4 ml-2"
                                aria-hidden="true"
                              />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Restaurants Section */}
            {restaurants.length > 0 && (
              <section className="mb-8" aria-labelledby="restaurants-heading">
                <h2
                  id="restaurants-heading"
                  className="text-2xl sm:text-3xl font-bold mb-4 text-white drop-shadow-lg flex items-center gap-2"
                >
                  <UtensilsCrossed className="w-6 h-6" aria-hidden="true" />
                  Dine & Discover
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {restaurants.map((restaurant) => (
                    <Card
                      key={restaurant.id}
                      className="overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={
                            restaurant.image || "/placeholder-restaurant.jpg"
                          }
                          alt={`${
                            restaurant.name
                          } serving ${restaurant.cuisine.join(", ")}`}
                          fill
                          className="object-cover"
                        />
                        {restaurant.rating && (
                          <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                            <Star
                              className="w-3 h-3 mr-1 fill-current"
                              aria-hidden="true"
                            />
                            {restaurant.rating}
                          </Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {restaurant.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" aria-hidden="true" />
                          {restaurant.city}, {restaurant.country}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {restaurant.cuisine.map((c, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {c}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">
                            {restaurant.priceRange}
                          </span>
                          {restaurant.bookingUrl && (
                            <a
                              href={restaurant.bookingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${restaurant.name} on Booking.com`}
                            >
                              <Button size="sm" variant="outline">
                                View Details
                                <ExternalLink
                                  className="w-4 h-4 ml-2"
                                  aria-hidden="true"
                                />
                              </Button>
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Cooking Classes Section */}
            {cookingClasses.length > 0 && (
              <section
                className="mb-8"
                aria-labelledby="cooking-classes-heading"
              >
                <h2
                  id="cooking-classes-heading"
                  className="text-2xl sm:text-3xl font-bold mb-4 text-white drop-shadow-lg flex items-center gap-2"
                >
                  <ChefHat className="w-6 h-6" aria-hidden="true" />
                  Cooking Classes & Workshops
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {cookingClasses.map((classItem) => (
                    <Card
                      key={classItem.id}
                      className="overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={classItem.image || "/placeholder-cooking.jpg"}
                          alt={`${classItem.name} cooking class`}
                          fill
                          className="object-cover"
                        />
                        {classItem.rating && (
                          <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                            <Star
                              className="w-3 h-3 mr-1 fill-current"
                              aria-hidden="true"
                            />
                            {classItem.rating}
                          </Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {classItem.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" aria-hidden="true" />
                          {classItem.city}, {classItem.country}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm">{classItem.description}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            {classItem.duration}
                          </div>
                          {classItem.maxParticipants && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" aria-hidden="true" />
                              Max {classItem.maxParticipants}
                            </div>
                          )}
                        </div>
                        {classItem.instructor && (
                          <Badge variant="outline">
                            Instructor: {classItem.instructor}
                          </Badge>
                        )}
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-lg font-bold">
                            {classItem.currency} {classItem.price}
                            <span className="text-sm font-normal text-muted-foreground">
                              /person
                            </span>
                          </span>
                          <a
                            href={classItem.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Book ${classItem.name} on Booking.com`}
                          >
                            <Button size="sm">
                              Book Class
                              <ExternalLink
                                className="w-4 h-4 ml-2"
                                aria-hidden="true"
                              />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Food Tours Section */}
            {foodTours.length > 0 && (
              <section className="mb-8" aria-labelledby="food-tours-heading">
                <h2
                  id="food-tours-heading"
                  className="text-2xl sm:text-3xl font-bold mb-4 text-white drop-shadow-lg flex items-center gap-2"
                >
                  <MapPin className="w-6 h-6" aria-hidden="true" />
                  Food Tours & Experiences
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {foodTours.map((tour) => (
                    <Card
                      key={tour.id}
                      className="overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={tour.image || "/placeholder-tour.jpg"}
                          alt={`${tour.name} food tour`}
                          fill
                          className="object-cover"
                        />
                        {tour.rating && (
                          <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                            <Star
                              className="w-3 h-3 mr-1 fill-current"
                              aria-hidden="true"
                            />
                            {tour.rating}
                          </Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{tour.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" aria-hidden="true" />
                          {tour.city}, {tour.country}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm">{tour.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {tour.cuisines.map((cuisine, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {cuisine}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            {tour.duration}
                          </div>
                          {tour.stops && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" aria-hidden="true" />
                              {tour.stops} stops
                            </div>
                          )}
                        </div>
                        {tour.highlights && tour.highlights.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs font-semibold">Highlights:</p>
                            <div className="flex flex-wrap gap-1">
                              {tour.highlights.map((highlight, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-lg font-bold">
                            {tour.currency} {tour.price}
                            <span className="text-sm font-normal text-muted-foreground">
                              /person
                            </span>
                          </span>
                          <a
                            href={tour.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Book ${tour.name} on Booking.com`}
                          >
                            <Button size="sm">
                              Book Tour
                              <ExternalLink
                                className="w-4 h-4 ml-2"
                                aria-hidden="true"
                              />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            <div className="text-center space-x-2 sm:space-x-4 flex flex-wrap justify-center gap-2">
              <Link href="/worlds">
                <Button
                  size="lg"
                  aria-label="Explore more cultural combinations"
                >
                  Explore More Worlds
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  aria-label="Return to home page"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Recipe Detail Modal */}
      <Dialog
        open={!!selectedMeal}
        onOpenChange={(open) => !open && setSelectedMeal(null)}
      >
        {selectedMeal && (
          <DialogContent onClose={() => setSelectedMeal(null)}>
            <DialogHeader>
              <DialogTitle>{selectedMeal.strMeal}</DialogTitle>
              <DialogDescription>
                {selectedMeal.strCategory} • {selectedMeal.strArea} Cuisine
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src={selectedMeal.strMealThumb}
                  alt={selectedMeal.strMeal}
                  fill
                  className="object-cover"
                />
              </div>

              {selectedMeal.strTags && (
                <div className="flex flex-wrap gap-2">
                  {selectedMeal.strTags.split(",").map((tag, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5" aria-hidden="true" />
                  Ingredients
                </h3>
                <ul className="space-y-1 text-sm">
                  {getIngredients(selectedMeal).map((ingredient, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                  Instructions
                </h3>
                <p className="text-sm whitespace-pre-line leading-relaxed">
                  {selectedMeal.strInstructions}
                </p>
              </div>

              {selectedMeal.strYoutube && (
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Youtube
                      className="w-5 h-5 text-red-600"
                      aria-hidden="true"
                    />
                    Video Tutorial
                  </h3>
                  <a
                    href={selectedMeal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Watch on YouTube
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              )}

              {/* Community Reviews Section */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" aria-hidden="true" />
                    Community Reviews (
                    {getReviewsByMeal(selectedMeal.idMeal).length})
                  </h3>
                  <div className="flex items-center gap-1">
                    {(() => {
                      const rating = getMealRating(selectedMeal.idMeal);
                      return rating.count > 0 ? (
                        <>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">
                            {rating.average}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({rating.count})
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          No ratings yet
                        </span>
                      );
                    })()}
                  </div>
                </div>

                {!showReviewForm && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReviewForm(true)}
                    className="w-full mb-4"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                )}

                {showReviewForm && (
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Your Rating
                      </label>
                      <RatingInput
                        value={newReview.rating}
                        onChange={(rating) =>
                          setNewReview({ ...newReview, rating })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Your Review
                      </label>
                      <Textarea
                        placeholder="Share your experience with this dish..."
                        value={newReview.comment}
                        onChange={(e) =>
                          setNewReview({
                            ...newReview,
                            comment: e.target.value,
                          })
                        }
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSubmitReview}
                        size="sm"
                        className="flex-1"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Submit Review
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowReviewForm(false);
                          setNewReview({ rating: 0, comment: "" });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                <ReviewsList
                  reviews={getReviewsByMeal(selectedMeal.idMeal)}
                  onReviewLike={loadReviews}
                />
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  className="flex-1"
                  variant={
                    favoriteFoods.includes(selectedMeal.strMeal)
                      ? "default"
                      : "outline"
                  }
                  onClick={() => {
                    toggleFavorite(selectedMeal.strMeal);
                  }}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      favoriteFoods.includes(selectedMeal.strMeal)
                        ? "fill-current"
                        : ""
                    }`}
                    aria-hidden="true"
                  />
                  {favoriteFoods.includes(selectedMeal.strMeal)
                    ? "Saved"
                    : "Save to Favorites"}
                </Button>
                {selectedMeal.strYoutube && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(selectedMeal.strYoutube, "_blank")
                    }
                  >
                    <Youtube className="w-4 h-4 mr-2" aria-hidden="true" />
                    Watch Video
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
