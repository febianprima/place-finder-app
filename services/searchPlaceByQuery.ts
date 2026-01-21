import { APP_CONFIG } from '@/constants';
import { logError, withRetry } from '@/utils';

/**
 * Search for a place using Google Places Service (Text Search)
 * This function demonstrates the use of async operations with Redux Thunk
 * Note: This uses the Google Maps JavaScript API through the browser, not direct HTTP calls
 */
export const searchPlaceByQuery = async (query: string): Promise<Place> => {
  return withRetry(async () => {
  try {
    if (!window.google?.maps?.places?.PlacesService) {
      throw new Error('Google Places API not loaded');
    }

    // Need a dummy div for PlacesService
    const div = document.createElement('div');
    const service = new window.google.maps.places.PlacesService(div);
    
    return new Promise((resolve, reject) => {
      service.findPlaceFromQuery(
        {
          query,
          fields: APP_CONFIG.GOOGLE_MAPS_FIELDS as unknown as string[],
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            const result = results[0];
            
            const place: Place = {
              id: result.place_id!,
              name: result.name || query.split(',')[0],
              formattedAddress: result.formatted_address || query,
              location: {
                lat: result.geometry?.location?.lat() || 0,
                lng: result.geometry?.location?.lng() || 0,
              },
              types: result.types,
              placeId: result.place_id,
            };

            resolve(place);
          } else {
            reject(new Error('No place found matching your query'));
          }
        }
      );
    });
  } catch (error: unknown) {
    logError('searchPlaceByQuery', error);
    throw new Error('Failed to fetch place information');
  }
  }, 2, 'searchPlaceByQuery'); // Retry up to 2 times for search
};
