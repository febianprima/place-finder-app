# Place Finder Application

A modern single-page application built with Next.js that incorporates Google Place Autocomplete to search for places and display results on an interactive map.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-purple)
![Ant Design](https://img.shields.io/badge/Ant_Design-5.0-red)

## Features

### 🔍 Autocomplete Functionality
- **Google Place Autocomplete API** integration with real-time suggestions as users type
- **Fallback Mock Data** system when Google API is unavailable
- Debounced search to optimize performance
- Intelligent place suggestions with formatted addresses

### 🗺️ Interactive Map
- **Google Maps API** integration with marker placement
- Custom info windows with place details
- Smooth animations and zoom controls
- Fallback display when API key is not configured

### 📦 State Management
- **Redux Toolkit** for centralized state management
- **Redux Thunk** middleware for async operations
- Persistent search history (up to 20 items)
- Real-time state updates across components

### 🎨 User Interface
- **Ant Design** components for modern, responsive UI
- Clean and intuitive design
- Mobile-responsive layout
- Dark mode ready
- Loading states and error handling

### 🏗️ Code Architecture
- **Clean folder structure** with separation of concerns
- **TypeScript** for type safety
- **ES6+ features** throughout the codebase
- **Higher Order Components (HOC)** for code reusability
- **Functional programming** principles
- **Custom hooks** for Redux integration

## Technology Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **State Management** | Redux Toolkit + Redux Thunk |
| **UI Library** | Ant Design |
| **Styling** | Tailwind CSS |
| **Maps** | Google Maps JavaScript API |
| **Places** | Google Places API |
| **HTTP Client** | Fetch API |

## Project Structure

```
place-finder-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Main application page
│   └── globals.css              # Global styles
├── components/
│   ├── Map/
│   │   └── Map.tsx              # Google Maps component
│   ├── SearchBox/
│   │   └── SearchBox.tsx        # Autocomplete search input
│   ├── SearchHistory/
│   │   └── SearchHistory.tsx    # Search history display
│   └── Providers/
│       ├── ReduxProvider.tsx    # Redux store provider
│       └── AntdProvider.tsx     # Ant Design config provider
├── store/
│   ├── index.ts                 # Redux store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   └── slices/
│       └── placesSlice.ts       # Places state slice with thunks
├── services/
│   └── placesService.ts         # API service layer
├── types/
│   └── place.ts                 # TypeScript interfaces
├── utils/
│   ├── mockPlaces.ts            # Mock data for fallback
│   └── debounce.ts              # Debounce utility (HOF)
├── .env.example                 # Environment variables template
└── README.md                    # This file
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- Yarn package manager
- Google Maps API key (optional - app works with mock data)

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:febianprima/place-finder-app.git
   cd place-finder-app
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

   **Getting a Google Maps API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
     - Geocoding API
   - Create credentials (API Key)
   - Copy the API key to your `.env.local` file

   **Note:** If you don't provide an API key, the app will automatically use mock data.

4. **Run the development server:**
   ```bash
   yarn dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Searching for Places

1. **Type in the search box** - Start typing a place name or address
2. **Select from suggestions** - Click on an autocomplete suggestion or press Enter
3. **View on map** - The selected place will be displayed on the interactive map
4. **Browse history** - Your search history appears on the right sidebar
5. **Click history items** - Revisit previous searches by clicking on history items

### Features in Action

- **Autocomplete**: Suggestions appear as you type (with 300ms debounce)
- **Search History**: Automatically saves your last 20 searches
- **Map Markers**: Click markers to see detailed information
- **Clear History**: Remove individual items or clear all history
- **Error Handling**: Graceful error messages for failed searches

## Code Patterns & Best Practices

### Redux Thunk Implementation

The application uses Redux Thunk (built into Redux Toolkit) for async operations:

```typescript
// Async thunk for searching places
export const searchPlace = createAsyncThunk(
  'places/searchPlace',
  async (query: string, { rejectWithValue }) => {
    try {
      const place = await searchPlaceByQuery(query);
      return { query, place };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### Higher Order Function (Debounce)

```typescript
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

### Typed Redux Hooks

```typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## API Integration

### Google Places Autocomplete
- Integrated via custom service layer
- Automatic fallback to mock data
- Type-safe responses

### Geocoding API
- Converts addresses to coordinates
- Used for map marker placement

### Mock Data Fallback
- 10 pre-configured famous landmarks
- Activates when no API key is provided
- Full search and autocomplete functionality

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | No* |

*The app works with mock data if not provided

## Key Features Implemented

✅ **Redux Toolkit** for state management  
✅ **Redux Thunk** middleware for async operations  
✅ **Ant Design** components throughout  
✅ **Google Places Autocomplete** API integration  
✅ **Google Maps** JavaScript API integration  
✅ **Mock data fallback** system  
✅ **TypeScript** with strict type checking  
✅ **Clean architecture** with separation of concerns  
✅ **ES6+ features** (arrow functions, async/await, destructuring)  
✅ **Higher Order Components** (Provider pattern)  
✅ **Functional programming** (pure functions, immutability)  
✅ **Responsive design** for mobile and desktop  

## Performance Optimizations

- **Debounced search** to reduce API calls
- **Memoized selectors** for Redux state
- **Code splitting** with Next.js dynamic imports
- **Optimized images** with Next.js Image component
- **Lazy loading** for map components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This project demonstrates best practices for:
- React/Next.js development
- Redux state management
- TypeScript usage
- API integration
- Clean code architecture

## License

MIT

## Author

Created with ❤️ as a demonstration of modern React development practices

---

**Note**: This application is built as a coding challenge demonstrating proficiency in React, Redux, TypeScript, and modern web development practices.
