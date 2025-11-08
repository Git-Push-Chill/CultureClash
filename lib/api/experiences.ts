export interface CookingClass {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  city: string;
  country: string;
  duration: string;
  price: number;
  currency: string;
  rating?: number;
  description: string;
  image?: string;
  bookingUrl: string;
  instructor?: string;
  maxParticipants?: number;
}

export interface FoodTour {
  id: string;
  name: string;
  cuisines: string[];
  city: string;
  country: string;
  duration: string;
  price: number;
  currency: string;
  rating?: number;
  description: string;
  image?: string;
  bookingUrl: string;
  stops?: number;
  highlights?: string[];
}

// Mock cooking classes data
const mockCookingClasses: Record<string, CookingClass[]> = {
  Italian: [
    {
      id: "cooking-italy-1",
      name: "Authentic Pasta Making Workshop",
      cuisine: "Italian",
      location: "Trastevere District",
      city: "Rome",
      country: "Italy",
      duration: "3 hours",
      price: 95,
      currency: "EUR",
      rating: 4.9,
      description:
        "Learn to make fresh pasta from scratch with a local nonna. Includes wine pairing and full meal.",
      image:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/attractions/search.html?ss=Rome+cooking+class",
      instructor: "Nonna Maria",
      maxParticipants: 8,
    },
    {
      id: "cooking-italy-2",
      name: "Tuscan Cooking Experience",
      cuisine: "Italian",
      location: "Countryside Villa",
      city: "Florence",
      country: "Italy",
      duration: "4 hours",
      price: 120,
      currency: "EUR",
      rating: 5.0,
      description:
        "Farm-to-table cooking class in a beautiful Tuscan villa. Learn traditional recipes with fresh ingredients.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/attractions/search.html?ss=Florence+cooking+class",
      instructor: "Chef Giovanni",
      maxParticipants: 10,
    },
  ],
  Japanese: [
    {
      id: "cooking-japan-1",
      name: "Sushi Master Class",
      cuisine: "Japanese",
      location: "Tsukiji District",
      city: "Tokyo",
      country: "Japan",
      duration: "2.5 hours",
      price: 110,
      currency: "USD",
      rating: 4.8,
      description:
        "Learn the art of sushi making from a master chef. Includes market tour and sake tasting.",
      image:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/attractions/search.html?ss=Tokyo+sushi+class",
      instructor: "Chef Takeshi",
      maxParticipants: 6,
    },
    {
      id: "cooking-japan-2",
      name: "Ramen Workshop Experience",
      cuisine: "Japanese",
      location: "Shinjuku",
      city: "Tokyo",
      country: "Japan",
      duration: "3 hours",
      price: 85,
      currency: "USD",
      rating: 4.7,
      description:
        "Create your own ramen from scratch - broth, noodles, and toppings. Enjoy your creation!",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/attractions/search.html?ss=Tokyo+ramen+class",
      instructor: "Chef Yuki",
      maxParticipants: 8,
    },
  ],
};

// Mock food tours data
const mockFoodTours: Record<string, FoodTour[]> = {
  Italian: [
    {
      id: "tour-italy-1",
      name: "Roman Food & Wine Walking Tour",
      cuisines: ["Italian", "Traditional"],
      city: "Rome",
      country: "Italy",
      duration: "4 hours",
      price: 89,
      currency: "EUR",
      rating: 4.9,
      description:
        "Explore Rome's culinary treasures with a local guide. Taste authentic pizza, gelato, and more!",
      image:
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/attractions/search.html?ss=Rome+food+tour",
      stops: 7,
      highlights: [
        "Pizza Tasting",
        "Gelato Making",
        "Wine Bar",
        "Local Market",
      ],
    },
  ],
  Japanese: [
    {
      id: "tour-japan-1",
      name: "Tokyo Street Food Adventure",
      cuisines: ["Japanese", "Street Food"],
      city: "Tokyo",
      country: "Japan",
      duration: "3.5 hours",
      price: 95,
      currency: "USD",
      rating: 4.8,
      description:
        "Discover hidden food gems in Tokyo's vibrant neighborhoods. Taste yakitori, takoyaki, and more!",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/attractions/search.html?ss=Tokyo+food+tour",
      stops: 6,
      highlights: ["Yakitori Alley", "Ramen Shop", "Izakaya", "Dessert Cafe"],
    },
  ],
};

function generateMockCookingClass(culture: string): CookingClass[] {
  const city =
    culture === "American"
      ? "New York"
      : culture === "French"
      ? "Paris"
      : culture === "Chinese"
      ? "Beijing"
      : culture;

  return [
    {
      id: `cooking-${culture.toLowerCase()}-1`,
      name: `${culture} Cooking Workshop`,
      cuisine: culture,
      location: `Central ${city}`,
      city: city,
      country: culture,
      duration: "3 hours",
      price: 85,
      currency: "USD",
      rating: 4.6,
      description: `Learn authentic ${culture} cooking techniques with a local chef. Hands-on experience included.`,
      image:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
      bookingUrl: `https://www.booking.com/attractions/search.html?ss=${encodeURIComponent(
        city
      )}+cooking+class`,
      maxParticipants: 10,
    },
  ];
}

function generateMockFoodTour(culture: string): FoodTour[] {
  const city =
    culture === "American"
      ? "New York"
      : culture === "French"
      ? "Paris"
      : culture === "Chinese"
      ? "Beijing"
      : culture;

  return [
    {
      id: `tour-${culture.toLowerCase()}-1`,
      name: `${city} Food Discovery Tour`,
      cuisines: [culture, "Local Specialties"],
      city: city,
      country: culture,
      duration: "3.5 hours",
      price: 75,
      currency: "USD",
      rating: 4.5,
      description: `Explore the best of ${culture} cuisine on this guided food tour. Visit local favorites and hidden gems.`,
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      bookingUrl: `https://www.booking.com/attractions/search.html?ss=${encodeURIComponent(
        city
      )}+food+tour`,
      stops: 5,
      highlights: [
        "Local Markets",
        "Traditional Restaurant",
        "Street Food",
        "Dessert Stop",
      ],
    },
  ];
}

export async function getCookingClassesByArea(
  area: string
): Promise<CookingClass[]> {
  try {
    // In production, replace with actual Booking.com Attractions API
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API delay
    return mockCookingClasses[area] || generateMockCookingClass(area);
  } catch (error) {
    console.error("Error fetching cooking classes:", error);
    return generateMockCookingClass(area);
  }
}

export async function getFoodToursByArea(area: string): Promise<FoodTour[]> {
  try {
    // In production, replace with actual Booking.com Attractions API
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API delay
    return mockFoodTours[area] || generateMockFoodTour(area);
  } catch (error) {
    console.error("Error fetching food tours:", error);
    return generateMockFoodTour(area);
  }
}

export async function getBlendedExperiences(
  area1: string,
  area2: string
): Promise<{
  cookingClasses: CookingClass[];
  foodTours: FoodTour[];
}> {
  const [classes1, classes2, tours1, tours2] = await Promise.all([
    getCookingClassesByArea(area1),
    getCookingClassesByArea(area2),
    getFoodToursByArea(area1),
    getFoodToursByArea(area2),
  ]);

  return {
    cookingClasses: [...classes1.slice(0, 2), ...classes2.slice(0, 2)],
    foodTours: [...tours1.slice(0, 1), ...tours2.slice(0, 1)],
  };
}
