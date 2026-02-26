# WanderAI - AI-Powered Travel Planner

## Description

An intelligent travel planning application that generates personalized itineraries using Google's Gemini AI. Simply describe your dream trip, and WanderAI will create a comprehensive travel plan with destinations, activities, tips, and beautiful imagery.

---

## Tech Stack

- Framework: Next.js 16 with App Router
- Language: JavaScript (ES6+)
- AI: Google Gemini AI
- Database: MongoDB Atlas
- Images: Unsplash API
- Styling: Tailwind CSS
- Deployment: Vercel (recommended)

## Features

- AI-Powered Itineraries - Generate detailed travel plans using Google Gemini AI
- Smart Route Planning - Day-by-day itineraries with timed activities
- Beautiful Imagery - Automatic destination photos from Unsplash
- Smart Caching - Saves generated plans to avoid duplicate AI calls
- SEO Optimized - Server-side rendering with proper meta tags
- Responsive Design - Works seamlessly on desktop, tablet, and mobile
- Social Sharing - Share your travel plans on Facebook
- Slug-based URLs - Clean, shareable URLs like /plan/paris-4-days

## Prerequisites

### Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- MongoDB Atlas account
- Google Gemini API key
- Unsplash API access key

## Set up environment variables

#### Create a .env.local file in the root directory:

```bash
# MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/travel_planner?retryWrites=true&w=majority

   # Google Gemini API
   GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX

   # Unsplash API
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key

   # App URL (for production)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation

**Clone the repository**

```bash
git clone https://github.com/aarifhsn/wander-ai
cd wander-ai
```

**Install dependencies**

```bash
npm install
# or
yarn install
```

**Start the development server**

```bash
npm run dev
# or
yarn dev
```

**Open your browser**

Navigate to `http://localhost:3000` (or the port shown in your terminal)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## How It Works

- User Input: User enters a travel prompt (e.g., "4 days in Paris")
- Validation: AI validates if the prompt is travel-related
- Extraction: AI extracts destination and duration
- Cache Check: System checks if plan already exists in database
- Generation: If not cached, Gemini AI generates a detailed itinerary
- Image Fetching: Unsplash API retrieves relevant destination images
- Database Storage: Plan is saved to MongoDB for future use
- Display: User is redirected to the detailed plan page

## Usage Examples

### Valid Travel Prompts

```bash
✅ "A romantic 4-day trip to Paris"
✅ "5 days in Bali for adventure and beaches"
✅ "Week-long cultural tour of Japan"
✅ "3-day weekend getaway to Bangkok"
✅ "Family-friendly 5-day trip to Dubai"
```

## Author

**Your Name**

- GitHub: [@aarifhsn](https://github.com/aarifhsn)
- Website: arifhassan.com

# wander-ai
