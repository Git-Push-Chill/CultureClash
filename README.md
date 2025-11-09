# Culture Clash - Where Taste Bridges Worlds 🌍✨

A Next.js web application that connects global cuisines by letting users explore cross-cultural food experiences and generate fusion recipes using AI. Choose your favorite food culture, blend it with another world, and discover unique dishes that bridge different culinary traditions.

## Project Vision

Culture Clash aims to bridge cultural divides through food by:

- Allowing users to explore cuisines from 28+ countries
- Generating AI-powered fusion recipes that blend culinary traditions
- Creating personalised cross-cultural dining experiences
- Building a community around global food exploration

## Current Features

- **🌍 World Selection**: Choose from 28+ different food cultures worldwide
- **🤖 AI Fusion Recipes**: Generate creative fusion recipes using Google Gemini AI (gemini-1.5-flash model)
- **👨‍🍳 Smart Recipe Generation**: AI blends ingredients, techniques, and traditions from both cuisines with detailed origin tracking
- **📖 Detailed Recipes**: Complete with ingredients, instructions, prep/cook times, servings, and cultural notes
- **🏴 Visual Flag Fusion**: Dynamic diagonal-split flag images combining both countries
- **💾 Local Storage**: Persistent storage for favorites, explored worlds, and search history
- **❤️ Favorites System**: Save and toggle favorite dishes across sessions
- **📜 Search History**: Track your last 10 cuisine fusion explorations with full recipe details
- **🔄 History Modal**: View and revisit previous fusion combinations with saved recipes
- **🎯 Smart Navigation**: Click on explored world badges to view recipes directly, click on favorite dishes to jump to specific recipe details
- **🔍 Quick Access**: Journey history and favorite dishes provide one-click access to past fusion recipes
- **�📱 Responsive Design**: Beautiful UI built with Tailwind CSS and shadcn/ui components
- **🎨 Gradient Themes**: Eye-catching gradient backgrounds and visual effects with animations
- **♿ Accessibility**: ARIA labels, keyboard navigation, focus management, and screen reader support
- **⚡ Error Handling**: Comprehensive error handling with user-friendly messages and retry functionality
- **🎯 Modal Interactions**: Keyboard navigation (Escape key), focus trapping, and click-outside-to-close

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4 with custom theme and animations
- **UI Components**: shadcn/ui components (Dialog, Card, Button, Badge, Input)
- **Animations**: Framer Motion for advanced animations
- **Icons**: Lucide React
- **APIs**:
  - TheMealDB API for cuisine data
  - Google Gemini AI (gemini-1.5-flash) for recipe generation
  - FlagCDN for country flag images
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Data Persistence**: localStorage with structured BridgeProfile
- **Routing**: Next.js App Router with dynamic routes
- **Deployment**: Vercel (planned)

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

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Google Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your free API key from: https://makersuite.google.com/app/apikey

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Development Roadmap

### Functional Requirements

#### ✅ Completed

**Core Setup & Architecture**

- [x] Create DevPost Project
- [x] Make CoPilot Starter Template
- [x] Set up initial project structure with Next.js 15 App Router
- [x] Configure TypeScript with proper type definitions
- [x] Implement basic UI with shadcn/ui components

**Cuisine Selection & Navigation**

- [x] Implement Cuisine Selection UI with proper routing
- [x] Refactor to use Next.js App Router with dynamic routes (`/worlds/[world1]/[world2]`)
- [x] Connect to Food Data API (TheMealDB integration)
- [x] Implement proper navigation flow between pages

**AI & Recipe Generation**

- [x] Build "Fuse Flavors" API Route with Google Gemini AI
- [x] "Randomise Fusion" Button for surprise combinations
- [x] "Refine Fusion" Button for iterative recipe improvement
- [x] Integrate AI Prompt for Recipe Generation with detailed instructions
- [x] Display Generated Fusion Recipes with detailed UI
- [x] Parse and structure AI responses into FusionRecipe format
- [x] Include ingredient origin tracking (world1, world2, or both)
- [x] Generate cultural notes explaining the fusion

**Visual Features**

- [x] Build "Flag Fusion" API Route for diagonal-split flag images
- [x] Integrate real flag images from flagcdn.com
- [x] Display fusion flags on recipe cards
- [x] Implement gradient animations and visual effects

**Data Persistence & Features**

- [x] Implement "Save to Favorites" Feature with toggle functionality
- [x] Track Explored World Combinations
- [x] Build Search History System (stores last 10 searches)
- [x] Create Search History Modal Component with 3-column grid layout
- [x] Persist data using localStorage with BridgeProfile structure
- [x] Save fusion recipes with search history
- [x] Implement smart navigation from homepage badges to modal views
- [x] Add direct recipe access by clicking on favorite dishes
- [x] Add direct fusion recipe view by clicking on explored world combinations
- [x] Filter and display relevant recipes based on user interaction

**Error Handling & UX**

- [x] Implement Error Handling for API calls
- [x] Add loading states with visual feedback
- [x] Create user-friendly error messages
- [x] Add "Try Again" functionality for failed API calls
- [x] Handle JSON parsing errors gracefully

**Accessibility & User Experience**

- [x] Add ARIA labels throughout the application
- [x] Implement keyboard navigation (Tab, Enter, Space, Escape)
- [x] Add focus management for modals
- [x] Prevent body scroll when modal is open
- [x] Implement click-outside-to-close for modals
- [x] Add proper semantic HTML structure

#### ✅ Recently Completed

**Core Features & Optimizations**

- [x] Add more robust validation for edge cases (validation.ts with comprehensive checks)
- [x] Optimise image loading and caching (imageCache.ts and apiCache.ts implemented)
- [x] Add flag images to fusion dropdowns with filtering
- [x] Implement searchable dropdown with country flags
- [x] Add API response caching to reduce API calls (30min-24hr TTL)
- [x] Add rate limiting helpers for API protection
- [x] Implement "Surprise Me!" random fusion button
- [x] Add "Refine Fusion" button for new recipe variations
- [x] Create comprehensive error boundary component
- [x] Add performance monitoring utilities with Web Vitals
- [x] Implement toast notification system
- [x] Add keyboard shortcuts hook for better navigation
- [x] Create loading skeleton components for better UX
- [x] Add custom scrollbar styling with gradient theme
- [x] Improve focus management with visible outlines
- [x] Add smooth scrolling throughout the app
- [x] Enhance SEO with comprehensive metadata

#### 🚧 In Progress (Backlog)

**Stretch Goals**

- [ ] Add AI Image Generation for fusion dishes (beyond flag fusion)
- [ ] Implement User Auth & Accounts
- [ ] Integrate Vercel Postgres/Supabase for data persistence
- [ ] Social sharing features
- [ ] Recipe rating system
- [ ] Community recipe submissions

### Non-Functional Requirements

#### ✅ Completed

- [x] Ensure Accessibility (ARIA labels, keyboard navigation, focus management)
- [x] Implement responsive design for mobile and desktop
- [x] Add proper error handling throughout the app

#### 🚧 In Progress

- [ ] Optimise AI API Calls for performance (caching, rate limiting)
- [ ] Add comprehensive unit and integration tests
- [ ] Implement performance monitoring
- [ ] SEO optimisation with proper metadata

### Misc Tasks

- [ ] Prepare Hackathon Demo Script

## How It Works

1. **Welcome Screen**: Start your journey from the homepage with options to explore or view history
2. **Select First World**: Choose your favorite food culture from 28+ cuisines
3. **Select Second World**: Pick another culture to blend with
4. **AI Fusion Generation**: AI automatically generates 3 fusion recipes combining both cuisines
5. **View Fusion Recipes**: Browse recipe cards with diagonal-split flag images
6. **Detailed Recipe Modal**: Click any recipe to see:
   - Full ingredients list with origin tracking (world1, world2, or both)
   - Step-by-step cooking instructions
   - Prep time, cook time, and servings
   - Cultural notes explaining the fusion
   - Source dishes from both cuisines
7. **Save Favorites**: Toggle heart icon to save/unsave dishes to favorites
8. **Journey History**: Track your last 10 fusion explorations with full recipe details
9. **Quick Access Navigation**:
   - Click on "Your Journey So Far" badges to view all recipes from that fusion combination
   - Click on "Your Favorite Dishes" badges to jump directly to that specific recipe
   - Use "Explore Again" card to view full history modal with all past fusions

## Project Structure

```
.
├── app/
│   ├── layout.tsx                      # Root layout with metadata
│   ├── page.tsx                        # Homepage/welcome screen with history
│   ├── globals.css                     # Global styles and CSS variables
│   ├── api/
│   │   ├── fuse-flavors/
│   │   │   └── route.ts                # POST endpoint for AI recipe generation
│   │   ├── flag-fusion/
│   │   │   └── route.ts                # GET endpoint for diagonal-split flags
│   │   └── test-gemini/
│   │       └── route.ts                # Test endpoint for Gemini API
│   └── worlds/
│       ├── page.tsx                    # World selection (first world)
│       └── [world1]/
│           ├── page.tsx                # Second world selection
│           └── [world2]/
│               └── page.tsx            # Fusion results with recipes
├── components/
│   ├── ErrorBoundary.tsx               # Error boundary for error handling
│   └── ui/                             # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       ├── dialog.tsx                  # Modal/dialog component
│       ├── toast.tsx                   # Toast notification component
│       ├── skeleton.tsx                # Loading skeleton components
│       └── search-history-modal.tsx    # History viewer with recipe details
├── lib/
│   ├── api/
│   │   ├── meals.ts                    # TheMealDB API integration with caching
│   │   └── fusion.ts                   # Google Gemini AI integration
│   ├── hooks/
│   │   ├── useToast.ts                 # Toast notification hook
│   │   └── useKeyboardShortcut.ts      # Keyboard shortcuts hook
│   ├── apiCache.ts                     # API response caching utilities
│   ├── imageCache.ts                   # Image caching and optimization
│   ├── validation.ts                   # Input validation and sanitization
│   ├── performance.ts                  # Performance monitoring utilities
│   ├── countryMapping.ts               # Country code to cuisine mapping
│   ├── types.ts                        # TypeScript type definitions
│   └── utils.ts                        # Utility functions (cn, etc.)
├── public/                             # Static assets
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
└── package.json                        # Dependencies and scripts
```

## API Integration

- **Food Data**: [TheMealDB API](https://www.themealdb.com/api.php) for cuisine information and meal details
- **AI Integration**: [Google Gemini AI](https://ai.google.dev/) (gemini-1.5-flash model) for fusion recipe generation with structured JSON responses
- **Flag Images**: [FlagCDN](https://flagcdn.com/) for high-quality country flag images
- **Visual Fusion**: Custom SVG generation for diagonal-split flag fusion images with base64 embedding

## Deployment

This project will be deployed on Vercel. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Available Worlds (28 Cuisines)

American, British, Canadian, Chinese, Croatian, Dutch, Egyptian, Filipino, French, Greek, Indian, Irish, Italian, Jamaican, Japanese, Kenyan, Malaysian, Mexican, Moroccan, Polish, Portuguese, Russian, Spanish, Thai, Tunisian, Turkish, Ukrainian, Vietnamese

## Key Features in Detail

### AI-Powered Fusion Recipe Generation

- Generates 3 unique fusion recipes per cuisine combination
- Each recipe includes:
  - Creative name reflecting both cultures
  - Detailed description
  - Source dishes from both cuisines
  - Ingredients with measurements and origin tags
  - Step-by-step cooking instructions
  - Cultural notes explaining the fusion
  - Prep time, cook time, and servings

### Visual Flag Fusion

- Dynamic SVG generation combining two country flags
- Diagonal split from top-left to bottom-right
- Base64-embedded images for better compatibility
- Displayed on recipe cards for visual appeal

### Search History & Favorites

- **Search History**: Stores last 10 cuisine fusion explorations with complete recipe details
- **Favorites**: Toggle heart icon to save/remove favorite dishes
- **Explored Worlds**: Tracks all world combinations you've tried (displayed as "Your Journey So Far")
- **Smart Navigation**:
  - Click on any explored world badge to instantly view that fusion's recipes
  - Click on any favorite dish badge to jump directly to that specific recipe detail
  - Filter and navigate through history seamlessly
- **Persistent Storage**: All data saved to localStorage with structured BridgeProfile
- **History Modal**: Full-featured modal with three-column grid layout showing country flags and fusion images
- **Direct Access**: Bypass list views and navigate straight to recipe details from homepage badges

### Accessibility & UX Features

- **Keyboard Navigation**: Full support for Tab, Enter, Space, and Escape keys
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Focus Management**: Proper focus trapping in modals with visible outlines
- **Semantic HTML**: Proper use of nav, header, section, and main elements
- **Visual Feedback**: Loading states, hover effects, focus indicators, and skeleton loaders
- **Searchable Dropdowns**: Filter cuisines with flags for easier selection
- **Custom Scrollbar**: Themed gradient scrollbar matching app aesthetics
- **Smooth Scrolling**: Enhanced navigation experience
- **Toast Notifications**: Non-intrusive feedback for user actions
- **Error Boundaries**: Graceful error handling with recovery options

### Performance & Optimization

- **API Caching**: Smart caching with TTL (30min for meals, 24hrs for areas)
- **In-Memory Cache**: Fast access during active sessions
- **Image Optimization**: Automatic image caching and optimization
- **Rate Limiting**: Protection against API abuse
- **Performance Monitoring**: Web Vitals tracking (LCP, FID, CLS)
- **Lazy Loading**: Efficient resource loading for better performance
- **Cache Management**: Automatic cleanup of expired cache entries

## Contributing

This is a hackathon project for [Hackathon Name]. Contributions and feedback are welcome!

## Team

Project created for the GitHub Copilot Hackathon.

## Acknowledgments

- Meal data provided by [TheMealDB](https://www.themealdb.com/)
- Icons from [Lucide React](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Built with [GitHub Copilot](https://github.com/features/copilot)
