/**
 * Validates the Google Maps API key from environment variables
 * @returns true if API key is valid, false otherwise
 */
export const validateGoogleMapsApiKey = (): boolean => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.warn('[Environment] Google Maps API key not configured');
    return false;
  }
  
  if (apiKey.length < 30) {
    console.error('[Environment] Invalid API key format - key too short');
    return false;
  }
  
  if (!apiKey.startsWith('AIza')) {
    console.warn('[Environment] API key format may be invalid - should start with "AIza"');
    return false;
  }
  
  return true;
};

/**
 * Gets the Google Maps API key with validation
 * @returns The API key or empty string if invalid
 */
export const getGoogleMapsApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  
  if (apiKey && !validateGoogleMapsApiKey()) {
    return '';
  }
  
  return apiKey;
};
