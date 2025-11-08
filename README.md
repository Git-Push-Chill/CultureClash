# Bridge - When Worlds Collide 🌍✨

A Next.js web application that connects global cuisines by letting users explore cross-cultural food experiences. Choose your favorite food culture, blend it with another world, and discover unique dishes that bridge different culinary traditions.

![Bridge Homepage](https://github.com/user-attachments/assets/c307a258-f85a-4dd1-823d-97ad6266a626)

## Features

- **🌍 World Selection**: Choose from 28+ different food cultures worldwide
- **🍳 Cultural Blending**: Select two worlds to create a unique cross-cultural dining experience
- **❤️ Favorites System**: Save your favorite dishes with local storage persistence
- **📱 Responsive Design**: Beautiful UI built with Tailwind CSS and shadcn/ui components
- **🎨 Gradient Themes**: Eye-catching gradient backgrounds and visual effects
- **🔄 Journey Tracking**: Keep track of all the worlds you've explored
- **🍜 Rich Meal Data**: View detailed ingredients, categories, and tags for each dish

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: shadcn/ui components
- **Icons**: Lucide React
- **API**: TheMealDB API (with fallback mock data)
- **Deployment**: Vercel-ready configuration

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

## How It Works

1. **Welcome Screen**: Start your journey from the homepage
2. **Select Home World**: Choose your favorite food culture
3. **Select Second World**: Pick another culture to blend with
4. **Explore Blended Dishes**: View curated meals from both cultures
5. **Save Favorites**: Click the heart icon to save dishes you love
6. **Journey History**: See all the worlds you've explored on the homepage

## Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/c307a258-f85a-4dd1-823d-97ad6266a626)

### World Selection
![World Selection](https://github.com/user-attachments/assets/927b25b6-e147-489f-8808-2561d0c13d5d)

### Second World Selection
![Second World](https://github.com/user-attachments/assets/c025d892-5cde-40ad-9d79-b21a9e02eb9e)

### Blended Experience
![Blended Meals](https://github.com/user-attachments/assets/8e6a7cca-fd48-406b-bbf6-8b6ff6d35e08)

### Homepage with Favorites
![Homepage with Favorites](https://github.com/user-attachments/assets/69bfe386-ecba-4abd-873f-1bf15032501c)

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

The app uses [TheMealDB API](https://www.themealdb.com/api.php) to fetch meal data. When the API is unavailable, it falls back to mock data to ensure a seamless user experience.

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with default settings

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ibby02/When-Worlds-Collide-2025)

## Available Worlds

American, British, Canadian, Chinese, Croatian, Dutch, Egyptian, Filipino, French, Greek, Indian, Irish, Italian, Jamaican, Japanese, Kenyan, Malaysian, Mexican, Moroccan, Polish, Portuguese, Russian, Spanish, Thai, Tunisian, Turkish, Ukrainian, Vietnamese

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Meal data provided by [TheMealDB](https://www.themealdb.com/)
- Icons from [Lucide React](https://lucide.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)