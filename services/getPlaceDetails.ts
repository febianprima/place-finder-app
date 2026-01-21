import { APP_CONFIG } from '@/constants';
import { logError } from '@/utils';

/**
 * Get place details by place ID
 */
export const getPlaceDetails = async (placeId: string): Promise<Place | null> => {
  try {
    if (!window.google?.maps?.places?.PlacesService) {
      throw new Error('Google Places API not loaded');
    }

    // Need a dummy div for PlacesService
    const div = document.createElement('div');
    const service = new window.google.maps.places.PlacesService(div);
    
    return new Promise((resolve) => {
      service.getDetails(
        { placeId, fields: APP_CONFIG.GOOGLE_MAPS_FIELDS as unknown as string[] },
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
  } catch (error: unknown) {
    logError('getPlaceDetails', error);
    return null;
  }
};
