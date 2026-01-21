import { logError } from '@/utils';

/**
 * Get autocomplete predictions using Google Places Autocomplete Service
 * Note: This uses the Google Maps JavaScript API through the browser, not direct HTTP calls
 */
export const getAutocompletePredictions = async (
  input: string
): Promise<Place[]> => {
  if (!input || input.trim().length === 0) {
    return [];
  }

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
  } catch (error: unknown) {
    logError('getAutocompletePredictions', error);
    return [];
  }
};
