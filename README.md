# Culture Clash - Where Taste Bridges Worlds 🌍✨

A Next.js web application that connects global cuisines by letting users explore cross-cultural food experiences and generate fusion recipes using AI. Choose your favorite food culture, blend it with another world, and discover unique dishes that bridge different culinary traditions.

## Project Vision

Culture Clash aims to bridge cultural divides through food by:

- Allowing users to explore cuisines from 28+ countries
- Generating AI-powered fusion recipes that blend culinary traditions
- Creating personalized cross-cultural dining experiences
- Building a community around global food exploration

## Current Features

- **🌍 World Selection**: Choose from 28+ different food cultures worldwide
- **📱 Responsive Design**: Beautiful UI built with Tailwind CSS and shadcn/ui components
- **🎨 Gradient Themes**: Eye-catching gradient backgrounds and visual effects

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **UI Components**: shadcn/ui components
- **Icons**: Lucide React
- **API**: TheMealDB API (with fallback mock data)
- **AI**: To be integrated for recipe generation
- **Database**: To be integrated (Vercel Postgres/Supabase)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ibby02/When-Worlds-Collide-2025.git
cd When-Worlds-Collide-2025
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

#### 🚧 In Progress (Backlog)

**Core Features**

- [ ] Implement Cuisine Selection UI
- [ ] Connect to Food Data API (TheMealDB integration)
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
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles and CSS variables
├── components/
│   └── ui/                 # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── input.tsx
├── lib/
│   ├── api/
│   │   └── meals.ts        # API integration and mock data
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
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
