# Quick Start Guide - AI Fusion Recipes

## 🚀 Getting Started

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:

```bash
GEMINI_API_KEY=your_actual_api_key_here
```

### Step 3: Install Dependencies (if not already done)

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Test the Fusion Feature

1. Open http://localhost:3000
2. Click "Explore Worlds"
3. Select your first cuisine (e.g., "Italian")
4. Select your second cuisine (e.g., "Japanese")
5. On the blended world page, click "Generate Fusion Recipes ✨"
6. Wait for the AI to create your fusion recipes (usually 5-15 seconds)
7. Explore the detailed fusion recipes with ingredients and instructions!

## 🎨 What You'll See

### Traditional Dishes Section

- 3 dishes from each selected cuisine
- Images, categories, and key ingredients
- Favorite button to save dishes you love

### AI Fusion Recipes Section

- 3 unique fusion recipes blending both cuisines
- Color-coded ingredients showing origin:
  - 🟢 Green = From first cuisine
  - 🔵 Blue = From second cuisine
  - 🟣 Purple = Common to both
- Complete recipe details:
  - Serving size
  - Prep and cook times
  - Step-by-step instructions
  - Cultural notes explaining the fusion

## 🐛 Troubleshooting

### "Gemini API key not configured" Error

- Make sure `.env.local` exists in the project root
- Verify your API key is correct
- Restart the development server after adding the key

### "Failed to generate fusion recipes" Error

- Check your internet connection
- Verify your Gemini API key is valid
- Check the browser console for detailed error messages

### Recipes Not Showing

- Wait for the loading animation to complete
- Check if there are any error messages displayed
- Try refreshing the page and generating again

## 📝 Example Combinations to Try

- **Italian + Japanese**: Mediterranean meets East Asian
- **Mexican + Indian**: Spicy fusion masterpieces
- **French + Thai**: Elegant meets bold flavors
- **American + Chinese**: East meets West classics
- **Greek + Moroccan**: Mediterranean fusion

## 🔧 Technical Notes

- **AI Model**: Uses Google Gemini 1.5 Flash
- **Response Time**: Typically 5-15 seconds per generation
- **Recipes Per Request**: 3 fusion recipes
- **API Calls**: One call per "Generate Fusion Recipes" click
- **Caching**: Currently no caching (future enhancement)

## 💡 Tips for Best Results

1. **Choose Different Cuisines**: More contrast = more creative fusion
2. **Wait for Loading**: AI generation takes a few seconds
3. **Favorite Recipes**: Click the heart icon to save recipes you love
4. **Try Multiple Combinations**: Each generation is unique!

## 🌟 Next Steps

Once you've tested the basic functionality:

1. Try different cuisine combinations
2. Favorite some recipes to test localStorage
3. Check the detailed ingredient origins
4. Read the cultural fusion notes
5. Consider adding your API key limits tracking

## 📚 Additional Resources

- [Implementation Guide](./FUSION_IMPLEMENTATION.md) - Detailed technical documentation
- [Google Gemini API Docs](https://ai.google.dev/docs) - Official API documentation
- [TheMealDB API](https://www.themealdb.com/api.php) - Meal data source

## ⚠️ Important Notes

- **API Costs**: Gemini API has free tier limits. Monitor your usage.
- **Rate Limits**: Don't spam the generate button to avoid rate limits.
- **Data Privacy**: Meal data is sent to Google's API for processing.

Enjoy creating fusion recipes! 🍳✨
