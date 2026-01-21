import { Place } from '@/types/place';
import { searchMockPlaces } from '@/utils/mockPlaces';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const USE_MOCK_DATA = !GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === '';

/**
 * Search for a place using Google Places API or mock data
 * This function demonstrates the use of async operations with Redux Thunk
 */
export const searchPlaceByQuery = async (query: string): Promise<Place> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (USE_MOCK_DATA) {
    // Use mock data when API key is not available
    const mockPlace = searchMockPlaces(query);
    
    if (!mockPlace) {
      throw new Error('No place found matching your query');
    }
    
    return mockPlace;
  }

  // Use Google Places API when available
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        query
      )}&key=${GOOGLE_MAPS_API_KEY}`
    );

    const data = await response.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const result = data.results[0];
      
      const place: Place = {
        id: result.place_id,
        name: result.formatted_address.split(',')[0],
        formattedAddress: result.formatted_address,
        location: {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
        },
        types: result.types,
        placeId: result.place_id,
      };

      return place;
    } else {
      throw new Error('No place found matching your query');
    }
  } catch (error) {
    console.error('Error fetching place:', error);
    throw new Error('Failed to fetch place information');
  }
};

/**
 * Get autocomplete predictions using Google Places API or mock data
 */
export const getAutocompletePredictions = async (
  input: string
): Promise<Place[]> => {
  if (!input || input.trim().length === 0) {
    return [];
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (USE_MOCK_DATA) {
    // Use mock data
    const { getMockAutocompleteSuggestions } = await import('@/utils/mockPlaces');
    return getMockAutocompleteSuggestions(input);
  }

  // Use Google Places Autocomplete API
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&key=${GOOGLE_MAPS_API_KEY}`
    );

    const data = await response.json();

    if (data.status === 'OK' && data.predictions) {
      return data.predictions.map((prediction: any) => ({
        id: prediction.place_id,
        name: prediction.structured_formatting.main_text,
        formattedAddress: prediction.description,
        location: { lat: 0, lng: 0 }, // Will be filled when selected
        placeId: prediction.place_id,
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching autocomplete:', error);
    return [];
  }
};

/**
 * Check if using mock data
 */
export const isUsingMockData = (): boolean => USE_MOCK_DATA;
