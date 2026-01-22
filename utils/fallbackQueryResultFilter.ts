import { FALLBACK_QUERY_RESULT_DATA } from '@/constants';

/**
 * Filter fallback query result data by search query
 * @param query - The search query string
 * @returns Filtered array of places (max 5 results)
 */
export const filterFallbackQueryResults = (query: string): Place[] => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  return FALLBACK_QUERY_RESULT_DATA.filter(
    (place) =>
      place.name.toLowerCase().includes(searchTerm) ||
      place.formattedAddress.toLowerCase().includes(searchTerm)
  ).slice(0, 5); // Limit to 5 results
};
