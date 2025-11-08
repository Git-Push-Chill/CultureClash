# Culture Clash - Where Taste Bridges Worlds 🌍✨

> **🏆 Built for Booking.com Hackathon 2025**

A Next.js web application that connects travelers with unique cross-cultural culinary experiences. Choose your favorite food culture, blend it with another world, and discover fusion dishes, hotels, restaurants, cooking classes, and food tours - all bookable through Booking.com!

## 🎯 Project Vision

Culture Clash bridges cultural divides through food by:

- 🌍 Exploring cuisines from 28+ countries worldwide
- 🍽️ Discovering unique fusion dishes that blend culinary traditions
- 🏨 Booking hotels and restaurants via Booking.com
- 👨‍🍳 Finding cooking classes and food tours
- 👥 Building a community through reviews and ratings
- ✈️ Creating complete travel itineraries centered around food

## ✨ Key Features

### � Culinary Discovery

- **Fusion Dishes**: Blend cuisines from 2 cultures (28+ options)
- **Full Recipes**: Complete instructions, ingredients, and video tutorials
- **Community Reviews**: Rate and review dishes, see what others think
- **Favorites System**: Save your preferred dishes

### 🏨 Booking.com Integration

- **Hotels**: Browse and book hotels in both cultures
- **Restaurants**: Find restaurants serving fusion cuisines
- **Cooking Classes**: Book hands-on cooking workshops
- **Food Tours**: Guided culinary experiences in each destination

### 📱 User Experience

- **Fully Responsive**: Perfect on mobile, tablet, and desktop
- **Accessible**: WCAG AA compliant, screen reader friendly
- **Smooth Animations**: Framer Motion powered transitions
- **Fast Loading**: Optimized images and skeleton loaders

### 🤝 Social Features

- **Star Ratings**: 1-5 star rating system
- **User Reviews**: Share your culinary experiences
- **Like Reviews**: Support helpful reviews
- **Community Stats**: Average ratings and review counts

### 🚀 Travel Planning

- **Export Itinerary**: Download your food journey as JSON
- **Share Feature**: Share via social media or copy link
- **Track Progress**: See your explored cultures
- **Journey History**: Keep track of your favorites

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom + Framer Motion
- **Icons**: Lucide React
- **APIs**:
  - TheMealDB (recipes)
  - Booking.com (hotels/experiences - mock for demo)
  - Dicebear (user avatars)
  - Unsplash (high-quality images)
- **State Management**: React Hooks + LocalStorage
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Git-Push-Chill/CultureClash.git
cd CultureClash
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Development Roadmap

### Functional Requirements

#### ✅ Completed

- [x] Create DevPost Project
- [x] Make CoPilot Starter Template
- [x] Set up initial project structure
- [x] Implement basic UI with shadcn/ui components
- [x] Implement Cuisine Selection UI with proper routing
- [x] Refactor to use Next.js App Router with dynamic routes
- [x] Connect to Food Data API (TheMealDB integration)

#### 🚧 In Progress (Backlog)

**Core Features**

- [ ] Build "Fuse Flavors" API Route
- [ ] Integrate AI Prompt for Recipe Generation
- [ ] Display Generated Fusion Recipe
- [ ] Implement "Save to Favorites" Feature
- [ ] Implement Validation & Error Handling

**Stretch Goals**

- [ ] Add AI Image Generation/Handling for fusion dishes
- [ ] Implement User Auth & Accounts
- [ ] Integrate Vercel Postgres/Supabase for data persistence
- [ ] "Randomize Fusion" Button for surprise combinations
- [ ] "Refine Fusion" Button for iterative recipe improvement

### Non-Functional Requirements

- [ ] Optimize AI API Calls for performance
- [ ] Ensure Accessibility (WCAG 2.1 compliance)

### Misc Tasks

- [ ] Prepare Hackathon Demo Script

## How It Will Work (Planned)

1. **Welcome Screen**: Start your journey from the homepage
2. **Select Home World**: Choose your favorite food culture
3. **Select Second World**: Pick another culture to blend with
4. **AI Fusion Generation**: Get AI-generated fusion recipes combining both cuisines
5. **View Fusion Recipe**: See detailed ingredients, instructions, and cultural context
6. **Save Favorites**: Save fusion recipes to your account
7. **Journey History**: Track all the worlds you've explored and recipes you've created

## Project Structure

```
.
├── app/
│   ├── layout.tsx                      # Root layout with metadata
│   ├── page.tsx                        # Homepage/welcome screen
│   ├── globals.css                     # Global styles and CSS variables
│   └── worlds/
│       ├── page.tsx                    # World selection (first world)
│       └── [world1]/
│           ├── page.tsx                # Second world selection
│           └── [world2]/
│               └── page.tsx            # Blended results page
├── components/
│   └── ui/                             # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── input.tsx
├── lib/
│   ├── api/
│   │   └── meals.ts                    # API integration and mock data
│   ├── hooks/
│   │   └── useLocalStorage.ts          # Custom hook for localStorage
│   ├── types.ts                        # TypeScript type definitions
│   └── utils.ts                        # Utility functions
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
└── tsconfig.json                       # TypeScript configuration
```

## API Integration

- **Food Data**: [TheMealDB API](https://www.themealdb.com/api.php) for cuisine information
- **AI Integration**: To be implemented for recipe generation
- **Image Generation**: To be implemented for visual representation of fusion dishes

## Deployment

This project will be deployed on Vercel. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Available Worlds

American, British, Canadian, Chinese, Croatian, Dutch, Egyptian, Filipino, French, Greek, Indian, Irish, Italian, Jamaican, Japanese, Kenyan, Malaysian, Mexican, Moroccan, Polish, Portuguese, Russian, Spanish, Thai, Tunisian, Turkish, Ukrainian, Vietnamese

## Contributing

This is a hackathon project for [Hackathon Name]. Contributions and feedback are welcome!

## Team

Project created for the GitHub Copilot Hackathon.

## Acknowledgments

- Meal data provided by [TheMealDB](https://www.themealdb.com/)
- Icons from [Lucide React](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Built with [GitHub Copilot](https://github.com/features/copilot)
