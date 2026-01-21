export interface Place {
  id: string;
  name: string;
  formattedAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  types?: string[];
  placeId?: string;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  place: Place;
  timestamp: number;
}

export interface PlacesState {
  currentPlace: Place | null;
  searchHistory: SearchHistoryItem[];
  isLoading: boolean;
  error: string | null;
}
