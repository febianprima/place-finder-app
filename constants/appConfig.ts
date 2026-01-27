/**
 * Application configuration constants
 * Centralized location for all magic numbers and configuration values
 */

export const APP_CONFIG = {
  // Search History
  SEARCH_HISTORY_LIMIT: 20,
  
  // Debounce Delays
  AUTOCOMPLETE_DEBOUNCE_MS: 300,
  
  // Map Configuration
  DEFAULT_MAP_ZOOM: 14,
  DEFAULT_MAP_ZOOM_NO_PLACE: 11,
  MAP_HEIGHT: '500px',
  
  // Default Location (Maybank Tower, Kuala Lumpur)
  DEFAULT_CENTER: {
    lat: 3.1488,
    lng: 101.7140,
  },
  
  // Retry Configuration
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
  RETRY_BACKOFF_MULTIPLIER: 2,
  
  // Google Maps API
  GOOGLE_MAPS_FIELDS: ['place_id', 'name', 'formatted_address', 'geometry', 'types'] as const,
} as const;
