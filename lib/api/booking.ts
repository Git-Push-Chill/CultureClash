import { Hotel, Restaurant } from "../types";

// Country to capital city mapping for better results
const countryCapitals: Record<string, string> = {
  American: "New York",
  British: "London",
  Canadian: "Toronto",
  Chinese: "Beijing",
  Croatian: "Zagreb",
  Dutch: "Amsterdam",
  Egyptian: "Cairo",
  Filipino: "Manila",
  French: "Paris",
  Greek: "Athens",
  Indian: "Mumbai",
  Irish: "Dublin",
  Italian: "Rome",
  Jamaican: "Kingston",
  Japanese: "Tokyo",
  Kenyan: "Nairobi",
  Malaysian: "Kuala Lumpur",
  Mexican: "Mexico City",
  Moroccan: "Marrakech",
  Polish: "Warsaw",
  Portuguese: "Lisbon",
  Russian: "Moscow",
  Spanish: "Madrid",
  Thai: "Bangkok",
  Tunisian: "Tunis",
  Turkish: "Istanbul",
  Ukrainian: "Kyiv",
  Vietnamese: "Hanoi",
};

// Mock hotel data for demonstration (in production, use Booking.com API)
const mockHotels: Record<string, Hotel[]> = {
  Italian: [
    {
      id: "hotel-rome-1",
      name: "Grand Hotel Roma",
      location: "Via Vittorio Veneto, 155",
      country: "Italy",
      city: "Rome",
      rating: 4.7,
      price: 180,
      currency: "EUR",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/hotel/it/grand-hotel-via-veneto.html",
      description:
        "Luxury hotel in the heart of Rome with authentic Italian dining experiences",
    },
    {
      id: "hotel-rome-2",
      name: "Trevi Boutique Hotel",
      location: "Vicolo del Puttarello, 25",
      country: "Italy",
      city: "Rome",
      rating: 4.5,
      price: 145,
      currency: "EUR",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Rome%2C+Italy",
      description: "Charming boutique hotel near Trevi Fountain",
    },
    {
      id: "hotel-florence-1",
      name: "Florence Art Hotel",
      location: "Piazza Santa Maria Novella",
      country: "Italy",
      city: "Florence",
      rating: 4.6,
      price: 165,
      currency: "EUR",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/searchresults.html?ss=Florence%2C+Italy",
      description: "Renaissance-style hotel with rooftop dining",
    },
  ],
  Japanese: [
    {
      id: "hotel-tokyo-1",
      name: "Tokyo Bay Luxury Suites",
      location: "1-9-1 Higashi-Shinagawa, Shinagawa",
      country: "Japan",
      city: "Tokyo",
      rating: 4.8,
      price: 220,
      currency: "USD",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/searchresults.html?ss=Tokyo%2C+Japan",
      description: "Modern luxury hotel with traditional Japanese hospitality",
    },
    {
      id: "hotel-kyoto-1",
      name: "Kyoto Traditional Ryokan",
      location: "Higashiyama Ward",
      country: "Japan",
      city: "Kyoto",
      rating: 4.9,
      price: 280,
      currency: "USD",
      image:
        "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/searchresults.html?ss=Kyoto%2C+Japan",
      description: "Authentic Japanese ryokan with kaiseki dining",
    },
    {
      id: "hotel-osaka-1",
      name: "Osaka Food District Hotel",
      location: "Dotonbori, Chuo Ward",
      country: "Japan",
      city: "Osaka",
      rating: 4.6,
      price: 175,
      currency: "USD",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      bookingUrl:
        "https://www.booking.com/searchresults.html?ss=Osaka%2C+Japan",
      description: "Located in the heart of Osaka's food paradise",
    },
  ],
};

// Mock restaurant data
const mockRestaurants: Record<string, Restaurant[]> = {
  Italian: [
    {
      id: "rest-rome-1",
      name: "Trattoria da Enzo",
      cuisine: ["Italian", "Traditional"],
      location: "Via dei Vascellari, 29",
      city: "Rome",
      country: "Italy",
      rating: 4.8,
      priceRange: "€€",
      bookingUrl:
        "https://www.booking.com/searchresults.html?ss=Rome+restaurants",
      image:
        "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop",
    },
    {
      id: "rest-rome-2",
      name: "La Pergola",
      cuisine: ["Italian", "Fine Dining", "Fusion"],
      location: "Via Alberto Cadlolo, 101",
      city: "Rome",
      country: "Italy",
      rating: 4.9,
      priceRange: "€€€€",
      bookingUrl:
        "https://www.booking.com/searchresults.html?ss=Rome+restaurants",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    },
  ],
  Japanese: [
    {
      id: "rest-tokyo-1",
      name: "Sukiyabashi Jiro",
      cuisine: ["Japanese", "Sushi", "Traditional"],
      location: "Ginza, Chuo City",
      city: "Tokyo",
      country: "Japan",
      rating: 5.0,
      priceRange: "€€€€",
      bookingUrl:
        "https://www.booking.com/searchresults.html?ss=Tokyo+restaurants",
      image:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
    },
    {
      id: "rest-tokyo-2",
      name: "Narisawa",
      cuisine: ["Japanese", "Fusion", "Innovation"],
      location: "Minato City",
      city: "Tokyo",
      country: "Japan",
      rating: 4.9,
      priceRange: "€€€€",
      bookingUrl:
        "https://www.booking.com/searchresults.html?ss=Tokyo+restaurants",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    },
  ],
};

// Generate default mock data for any culture
function generateMockHotels(culture: string): Hotel[] {
  const city = countryCapitals[culture] || culture;
  const country = culture;

  return [
    {
      id: `hotel-${culture.toLowerCase()}-1`,
      name: `${city} Heritage Hotel`,
      location: `Central ${city}`,
      country: country,
      city: city,
      rating: 4.5,
      price: 150,
      currency: "USD",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
        city
      )}`,
      description: `Experience authentic ${culture} culture and cuisine`,
    },
    {
      id: `hotel-${culture.toLowerCase()}-2`,
      name: `${city} Grand Plaza`,
      location: `Downtown ${city}`,
      country: country,
      city: city,
      rating: 4.6,
      price: 185,
      currency: "USD",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
      bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
        city
      )}`,
      description: `Modern luxury in the heart of ${city}`,
    },
  ];
}

function generateMockRestaurants(culture: string): Restaurant[] {
  const city = countryCapitals[culture] || culture;
  const country = culture;

  return [
    {
      id: `rest-${culture.toLowerCase()}-1`,
      name: `${culture} Culinary House`,
      cuisine: [culture, "Traditional"],
      location: `Old Town ${city}`,
      city: city,
      country: country,
      rating: 4.7,
      priceRange: "€€",
      bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
        city
      )}+restaurants`,
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    },
    {
      id: `rest-${culture.toLowerCase()}-2`,
      name: `Modern ${culture} Bistro`,
      cuisine: [culture, "Fusion", "Contemporary"],
      location: `${city} Food District`,
      city: city,
      country: country,
      rating: 4.8,
      priceRange: "€€€",
      bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
        city
      )}+restaurants`,
      image:
        "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop",
    },
  ];
}

export async function getHotelsByArea(area: string): Promise<Hotel[]> {
  try {
    // In production, replace with actual Booking.com API call
    // const response = await fetch(`https://booking-com-api.com/hotels?location=${area}`);
    // const data = await response.json();
    // return data.hotels;

    // Return mock data for now
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
    return mockHotels[area] || generateMockHotels(area);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return generateMockHotels(area);
  }
}

export async function getRestaurantsByArea(
  area: string
): Promise<Restaurant[]> {
  try {
    // In production, replace with actual Booking.com API call
    // const response = await fetch(`https://booking-com-api.com/restaurants?location=${area}`);
    // const data = await response.json();
    // return data.restaurants;

    // Return mock data for now
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
    return mockRestaurants[area] || generateMockRestaurants(area);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return generateMockRestaurants(area);
  }
}

export async function getBlendedHotels(
  area1: string,
  area2: string
): Promise<Hotel[]> {
  const [hotels1, hotels2] = await Promise.all([
    getHotelsByArea(area1),
    getHotelsByArea(area2),
  ]);

  // Mix hotels from both areas
  return [...hotels1.slice(0, 2), ...hotels2.slice(0, 2)];
}

export async function getBlendedRestaurants(
  area1: string,
  area2: string
): Promise<Restaurant[]> {
  const [restaurants1, restaurants2] = await Promise.all([
    getRestaurantsByArea(area1),
    getRestaurantsByArea(area2),
  ]);

  // Mix restaurants from both areas
  return [...restaurants1.slice(0, 2), ...restaurants2.slice(0, 2)];
}

// Helper function to get Booking.com search URL
export function getBookingSearchUrl(
  city: string,
  checkIn?: Date,
  checkOut?: Date
): string {
  const baseUrl = "https://www.booking.com/searchresults.html";
  const params = new URLSearchParams({
    ss: city,
    checkin: checkIn ? checkIn.toISOString().split("T")[0] : "",
    checkout: checkOut ? checkOut.toISOString().split("T")[0] : "",
  });

  return `${baseUrl}?${params.toString()}`;
}
