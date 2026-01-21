/**
 * Creates a new search history item
 * @param place - The place object
 * @param query - The search query string
 * @returns A new SearchHistoryItem with unique ID and timestamp
 */
export const createHistoryItem = (
  place: Place,
  query: string
): SearchHistoryItem => {
  return {
    id: `${Date.now()}-${Math.random()}`,
    query,
    place,
    timestamp: Date.now(),
  };
};
