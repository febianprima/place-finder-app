import { Place } from '@/types/place';

// Mock places data for fallback when Google Places API is not available
export const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Statue of Liberty',
    formattedAddress: 'Liberty Island, New York, NY 10004, USA',
    location: { lat: 40.6892, lng: -74.0445 },
    types: ['tourist_attraction', 'point_of_interest'],
  },
  {
    id: '2',
    name: 'Times Square',
    formattedAddress: 'Manhattan, NY 10036, USA',
    location: { lat: 40.758, lng: -73.9855 },
    types: ['tourist_attraction', 'point_of_interest'],
  },
  {
    id: '3',
    name: 'Central Park',
    formattedAddress: 'New York, NY, USA',
    location: { lat: 40.7829, lng: -73.9654 },
    types: ['park', 'tourist_attraction', 'point_of_interest'],
  },
  {
    id: '4',
    name: 'Empire State Building',
    formattedAddress: '20 W 34th St., New York, NY 10001, USA',
    location: { lat: 40.7484, lng: -73.9857 },
    types: ['tourist_attraction', 'point_of_interest'],
  },
  {
    id: '5',
    name: 'Brooklyn Bridge',
    formattedAddress: 'New York, NY 10038, USA',
    location: { lat: 40.7061, lng: -73.9969 },
    types: ['tourist_attraction', 'point_of_interest'],
  },
  {
    id: '6',
    name: 'Golden Gate Bridge',
    formattedAddress: 'Golden Gate Bridge, San Francisco, CA, USA',
    location: { lat: 37.8199, lng: -122.4783 },
    types: ['tourist_attraction', 'point_of_interest'],
  },
  {
    id: '7',
    name: 'Eiffel Tower',
    formattedAddress: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    location: { lat: 48.8584, lng: 2.2945 },
    types: ['tourist_attraction', 'point_of_interest'],
  },
  {
    id: '8',
    name: 'Big Ben',
    formattedAddress: 'Westminster, London SW1A 0AA, UK',
    location: { lat: 51.5007, lng: -0.1246 },
    types: ['tourist_attraction', 'point_of_interest'],
  },
  {
    id: '9',
    name: 'Sydney Opera House',
    formattedAddress: 'Bennelong Point, Sydney NSW 2000, Australia',
    location: { lat: -33.8568, lng: 151.2153 },
    types: ['tourist_attraction', 'point_of_interest'],
  },
  {
    id: '10',
    name: 'Tokyo Tower',
    formattedAddress: '4-2-8 Shiba-koen, Minato City, Tokyo 105-0011, Japan',
    location: { lat: 35.6586, lng: 139.7454 },
    types: ['tourist_attraction', 'point_of_interest'],
  },
];

// Search mock places by query
export const searchMockPlaces = (query: string): Place | null => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  if (!lowercaseQuery) return null;
  
  // Find exact or partial match
  const place = mockPlaces.find(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.formattedAddress.toLowerCase().includes(lowercaseQuery)
  );
  
  return place || null;
};

// Get autocomplete suggestions from mock data
export const getMockAutocompleteSuggestions = (query: string): Place[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  if (!lowercaseQuery) return [];
  
  return mockPlaces.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.formattedAddress.toLowerCase().includes(lowercaseQuery)
  );
};
