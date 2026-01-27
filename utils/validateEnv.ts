/**
 * Validates the Google Maps API key from environment variables
 * @returns true if API key is configured, false otherwise
 */
export const validateGoogleMapsApiKey = (): boolean => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.warn('[Environment] Google Maps API key not configured');
    return false;
  }
  
  return true;
};

/**
 * Gets the Google Maps API key with validation
 * @returns The API key or empty string if not configured
 */
export const getGoogleMapsApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  
  if (apiKey && !validateGoogleMapsApiKey()) {
    return '';
  }
  
  return apiKey;
};
