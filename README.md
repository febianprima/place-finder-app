# Place Finder Application

A modern, performant single-page application built with Next.js that integrates Google Maps and Places APIs to search for locations and display them on an interactive map.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-purple)
![Ant Design](https://img.shields.io/badge/Ant_Design-5.0-red)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-06B6D4)

## Features

### 🔍 Smart Search with Autocomplete
- **Real-time autocomplete** powered by Google Places API
- **Debounced search** (300ms) for optimal performance
- **Intelligent suggestions** with formatted addresses and location icons
- **Direct place selection** from autocomplete dropdown
- **Fallback text search** for custom queries

### 🗺️ Interactive Google Maps
- **Dynamic map** with marker placement and animations
- **Custom info windows** displaying place details
- **Smooth zoom** and pan controls
- **Default location** set to Maybank Tower, Kuala Lumpur
- **Responsive container** adapting to screen sizes

### 📜 Search History
- **Persistent history** storing last 20 searches
- **Timestamp display** with relative time (e.g., "5m ago", "2h ago")
- **Quick revisit** by clicking on history items
- **Individual removal** or clear all functionality
- **Multi-line address display** with ellipsis

### 🎨 Modern UI/UX
- **Ant Design** components with custom Tailwind CSS styling
- **Responsive layout** for mobile, tablet, and desktop
- **Loading states** with skeleton loaders to prevent CLS
- **Error handling** with user-friendly messages
- **Header & Footer** components with GitHub link
- **Technology stack showcase** on homepage

### ⚡ Performance Optimizations
- **React.memo** for static components (Header, Footer, MapCard, TechStack)
- **Memoized Redux selectors** using `createSelector`
- **Custom hooks** for separation of concerns
- **Debounced autocomplete** to reduce API calls
- **No artificial delays** - direct API integration
- **Skeleton loaders** to prevent Cumulative Layout Shift (CLS)

### 🏗️ Clean Architecture
- **Separation of concerns** with dedicated folders
- **Custom hooks** for business logic (useSearch, useMap, useSearchHistory)
- **Service layer** for API calls
- **Redux patterns** with separate actions, reducers, and selectors
- **Ambient type declarations** for global type availability
- **Barrel exports** for cleaner imports
- **Named exports** throughout (no default exports in components)

## Technology Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **State Management** | Redux Toolkit + Redux Thunk |
| **UI Library** | Ant Design 5 |
| **Styling** | Tailwind CSS 3 |
| **Maps** | Google Maps JavaScript API |
| **Places** | Google Places API (Autocomplete & Details) |
| **Package Manager** | Yarn |

## Project Structure

```
place-finder-app/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Main application page
│   └── globals.css                   # Global styles
├── components/                       # React components (flattened)
│   ├── Header.tsx                    # Header with logo and GitHub link
│   ├── Footer.tsx                    # Footer with copyright
│   ├── MapCard.tsx                   # Card container for search and map
│   ├── SearchBox.tsx                 # Autocomplete search input
│   ├── Map.tsx                       # Google Maps component
│   ├── SearchHistory.tsx             # Search history sidebar
│   ├── TechStack.tsx                 # Technology stack showcase
│   └── index.ts                      # Barrel exports
├── contexts/                         # React Context providers
│   ├── ReduxProvider.tsx             # Redux store provider
│   ├── AntdProvider.tsx              # Ant Design config provider
│   └── index.ts                      # Barrel exports
├── hooks/                            # Custom React hooks
│   ├── useSearch.ts                  # Search and autocomplete logic
│   ├── useMap.ts                     # Map state and interactions
│   ├── useSearchHistory.ts           # History management logic
│   └── index.ts                      # Barrel exports
├── store/                            # Redux store
│   ├── index.ts                      # Store configuration
│   ├── selectors/                    # Memoized selectors
│   │   ├── placesSelectors.ts        # Places state selectors
│   │   └── index.ts                  # Barrel exports
│   └── slices/                       # Redux slices
│       ├── placesActions.ts          # Async thunk actions
│       ├── placesReducer.ts          # Slice and reducers
│       └── index.ts                  # Barrel exports
├── services/                         # API service layer
│   ├── searchPlaceByQuery.ts         # Text search service
│   ├── getAutocompletePredictions.ts # Autocomplete service
│   ├── getPlaceDetails.ts            # Place details service
│   └── index.ts                      # Barrel exports
├── constants/                        # Application constants
│   ├── techStack.ts                  # Tech stack configuration
│   ├── placesInitialState.ts         # Redux initial state
│   └── index.ts                      # Barrel exports
├── utils/                            # Utility functions
│   ├── debounce.ts                   # Debounce HOF
│   ├── time.ts                       # Time formatting utilities
│   └── index.ts                      # Barrel exports
├── types/                            # TypeScript type declarations
│   ├── place.d.ts                    # Ambient place types
│   └── google-maps.d.ts              # Google Maps types extension
├── .env.local                        # Environment variables (gitignored)
├── next.config.ts                    # Next.js configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **Yarn** package manager
- **Google Maps API key** with the following APIs enabled:
  - Maps JavaScript API
  - Places API

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
     - **Maps JavaScript API**
     - **Places API**
   - Create credentials (API Key)
   - Copy the API key to your `.env.local` file

   **Important:** The application requires a valid API key to function properly.

4. **Run the development server:**
   ```bash
   yarn dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Searching for Places

1. **Type in the search box** - Start typing a place name or address
2. **Select from autocomplete** - Choose from real-time suggestions
3. **Press Enter** - Or press Enter to search for exact query
4. **View on map** - The place appears with a marker and zoom animation
5. **Browse history** - Your searches are saved in the right sidebar
6. **Revisit places** - Click on any history item to reload it on the map

### Features in Detail

- **Autocomplete**: Powered by Google Places API with 300ms debounce
- **Search History**: Automatically saves last 20 searches with timestamps
- **Map Markers**: Animated drop effect, clickable for info windows
- **Info Windows**: Display place name and full formatted address
- **Clear History**: Remove individual items or clear entire history
- **Error Handling**: User-friendly error messages with retry options

## Code Architecture

### Custom Hooks Pattern

The application uses custom hooks to separate UI from business logic:

```typescript
// useSearch.ts - Search and autocomplete logic
export const useSearch = () => {
  // State management
  // Debounced autocomplete
  // Place selection logic
  // Redux dispatch
  return { searchValue, options, isLoading, handleSearch, handleSelect, ... };
};

// SearchBox.tsx - Pure UI component
export const SearchBox = () => {
  const { searchValue, options, handleSearch, handleSelect } = useSearch();
  return <AutoComplete ... />;
};
```

### Redux Architecture

**Actions (Async Thunks):**
```typescript
// store/slices/placesActions.ts
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

**Reducers:**
```typescript
// store/slices/placesReducer.ts
const placesSlice = createSlice({
  name: 'places',
  initialState: PLACES_INITIAL_STATE,
  reducers: {
    setCurrentPlace: (state, action) => { ... },
    setCurrentPlaceWithHistory: (state, action) => { ... },
    removeFromHistory: (state, action) => { ... },
    clearHistory: (state) => { ... },
  },
  extraReducers: (builder) => { ... },
});
```

**Selectors (Memoized):**
```typescript
// store/selectors/placesSelectors.ts
const placesSelector = (state: RootState) => state.places;

export const currentPlaceSelector = createSelector(
  placesSelector,
  (state) => state.currentPlace,
);

export const isLoadingSelector = createSelector(
  placesSelector,
  (state) => state.isLoading,
);
```

### Service Layer Pattern

```typescript
// services/searchPlaceByQuery.ts
export const searchPlaceByQuery = async (query: string): Promise<Place> => {
  // Google Places Service implementation
  // Error handling
  // Type-safe response mapping
};
```

### Ambient Type Declarations

```typescript
// types/place.d.ts - No imports needed!
interface Place {
  id: string;
  name: string;
  formattedAddress: string;
  location: { lat: number; lng: number };
  types?: string[];
  placeId?: string;
}

interface SearchHistoryItem {
  id: string;
  query: string;
  place: Place;
  timestamp: number;
}

interface PlacesState {
  currentPlace: Place | null;
  searchHistory: SearchHistoryItem[];
  isLoading: boolean;
  error: string | null;
}
```

### Higher Order Function (Debounce)

```typescript
// utils/debounce.ts
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

## Performance Best Practices

### React.memo for Static Components
```typescript
const HeaderComponent = () => { ... };
export const Header = React.memo(HeaderComponent);
```

### Memoized Selectors
```typescript
export const currentPlaceSelector = createSelector(
  placesSelector,
  (state) => state.currentPlace,
);
```

### Custom Hooks for Logic Separation
- **useSearch**: Search and autocomplete logic
- **useMap**: Map state and interactions
- **useSearchHistory**: History management

### Skeleton Loaders for CLS Prevention
```typescript
if (!isLoaded) {
  return <Skeleton.Input active block style={{ height: '500px' }} />;
}
```

## Building for Production

```bash
# Build the application
yarn build

# Start production server
yarn start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | Yes |

## Key Features Implemented

✅ **Next.js 16** with App Router  
✅ **TypeScript** with strict type checking  
✅ **Redux Toolkit** for state management  
✅ **Redux Thunk** for async operations  
✅ **Memoized selectors** for performance  
✅ **Custom hooks** for separation of concerns  
✅ **Ant Design** components with Tailwind CSS  
✅ **Google Places Autocomplete** integration  
✅ **Google Maps** JavaScript API integration  
✅ **Service layer** architecture  
✅ **React.memo** for static components  
✅ **Skeleton loaders** for CLS prevention  
✅ **Ambient type declarations** for cleaner code  
✅ **Named exports** throughout (no default exports)  
✅ **Barrel exports** for organized imports  
✅ **Clean folder structure** with separation of concerns  

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Principles

This project demonstrates:
- **Clean Code**: Readable, maintainable, and well-organized
- **Separation of Concerns**: UI, logic, and data layers separated
- **Type Safety**: Full TypeScript coverage with ambient declarations
- **Performance**: Memoization, debouncing, and skeleton loaders
- **Best Practices**: React patterns, Redux patterns, and modern JavaScript
- **Code Reusability**: Custom hooks, service layer, and utility functions

## Contributing

Contributions are welcome! Please follow the existing code style and patterns.

## License

MIT

## Author

Created by [@febianprima](https://github.com/febianprima)

---

**Note**: This application showcases modern React/Next.js development with clean architecture, performance optimization, and production-ready patterns.
