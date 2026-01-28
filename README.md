# Flight Search Engine

A modern flight search application built with Vite, React, TypeScript, Material UI, and Netlify Functions. Search and compare flight prices using the Amadeus API.

## Features

- ✈️ **Flight Search**: Search for flights by origin, destination, and departure date
- 📊 **Price Visualization**: View flight prices with interactive charts
- 🔍 **Filtering**: Filter results by price and number of stops
- 🎨 **Modern UI**: Built with Material UI for a clean, responsive interface
- ⚡ **Fast Performance**: Powered by Vite for optimal build speeds
- 🔐 **Secure Backend**: Amadeus API integration via Netlify Functions

## Tech Stack

- **Frontend**: React 18, TypeScript, Material UI, Recharts
- **Build Tool**: Vite
- **Styling**: MUI System & CSS
- **Backend**: Netlify Functions (Node.js)
- **API Integration**: Amadeus Flight Search API
- **Deployment**: Netlify

## Project Structure

```
flight-search-engine/
├── src/
│   ├── components/           # Reusable React components
│   ├── pages/
│   │   └── Home.tsx         # Main search page
│   ├── services/
│   │   └── flightsApi.ts    # Axios API client
│   ├── types/
│   │   └── flight.ts        # TypeScript interfaces
│   ├── App.tsx              # Root component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── netlify/
│   └── functions/
│       └── flights.js       # Backend function for Amadeus API
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── netlify.toml             # Netlify configuration
└── README.md                # This file
```

## Setup & Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Amadeus API credentials

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/emrah2005/flight-search-engine.git
   cd flight-search-engine
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your Amadeus API credentials:
   ```
   AMADEUS_CLIENT_ID=your_client_id
   AMADEUS_CLIENT_SECRET=your_client_secret
   VITE_API_URL=/.netlify/functions/flights
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## API Integration

The application uses the **Amadeus API** for flight data. The backend function handles:

- OAuth2 token generation
- Flight search requests
- Response formatting and error handling

### Backend Function (netlify/functions/flights.js)

Handles POST requests to:
- `/search` - Search flights by origin, destination, and date
- `/autocomplete` - Get airport suggestions

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard:
   - `AMADEUS_CLIENT_ID`
   - `AMADEUS_CLIENT_SECRET`
4. Deploy

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Status

This is a fully functional flight search application ready for production deployment.

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues and questions, please open an issue on GitHub.

## Author

Built with ❤️ by emrah2005
