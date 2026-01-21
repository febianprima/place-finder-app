import { Place } from '@/types/place';
import { searchMockPlaces } from '@/utils/mockPlaces';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const USE_MOCK_DATA = !GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === '';

/**
 * Search for a place using Google Geocoder API or mock data
 * This function demonstrates the use of async operations with Redux Thunk
 * Note: This uses the Google Maps JavaScript API through the browser, not direct HTTP calls
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

  // Use Google Geocoder API when available
  try {
    if (!window.google?.maps?.Geocoder) {
      throw new Error('Google Maps API not loaded');
    }

    const geocoder = new window.google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: query }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const result = results[0];
          
          const place: Place = {
            id: result.place_id,
            name: result.formatted_address.split(',')[0],
            formattedAddress: result.formatted_address,
            location: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
            },
            types: result.types,
            placeId: result.place_id,
          };

          resolve(place);
        } else {
          reject(new Error('No place found matching your query'));
        }
      });
    });
  } catch (error) {
    console.error('Error fetching place:', error);
    throw new Error('Failed to fetch place information');
  }
};

/**
 * Get autocomplete predictions using Google Places Autocomplete Service or mock data
 * Note: This uses the Google Maps JavaScript API through the browser, not direct HTTP calls
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

  // Use Google Places Autocomplete Service
  try {
    if (!window.google?.maps?.places?.AutocompleteService) {
      throw new Error('Google Places API not loaded');
    }

    const service = new window.google.maps.places.AutocompleteService();
    
    return new Promise((resolve) => {
      service.getPlacePredictions(
        { input },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            const places = predictions.map((prediction) => ({
              id: prediction.place_id,
              name: prediction.structured_formatting.main_text,
              formattedAddress: prediction.description,
              location: { lat: 0, lng: 0 }, // Will be filled when selected
              placeId: prediction.place_id,
            }));
            resolve(places);
          } else {
            resolve([]);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error fetching autocomplete:', error);
    return [];
  }
};

/**
 * Get place details by place ID
 */
export const getPlaceDetails = async (placeId: string): Promise<Place | null> => {
  if (USE_MOCK_DATA) {
    return null;
  }

  try {
    if (!window.google?.maps?.places?.PlacesService) {
      throw new Error('Google Places API not loaded');
    }

    // Need a dummy div for PlacesService
    const div = document.createElement('div');
    const service = new window.google.maps.places.PlacesService(div);
    
    return new Promise((resolve) => {
      service.getDetails(
        { placeId, fields: ['place_id', 'name', 'formatted_address', 'geometry', 'types'] },
        (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && result) {
            const place: Place = {
              id: result.place_id!,
              name: result.name || '',
              formattedAddress: result.formatted_address || '',
              location: {
                lat: result.geometry?.location?.lat() || 0,
                lng: result.geometry?.location?.lng() || 0,
              },
              types: result.types,
              placeId: result.place_id,
            };
            resolve(place);
          } else {
            resolve(null);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};

/**
 * Check if using mock data
 */
export const isUsingMockData = (): boolean => USE_MOCK_DATA;
