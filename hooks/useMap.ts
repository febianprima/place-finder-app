import { useState, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { currentPlaceSelector, isLoadingSelector, errorSelector } from '@/store/selectors';

const defaultCenter = {
  lat: 3.1488,
  lng: 101.7140, // Maybank Tower, Kuala Lumpur
};

// Must be outside component to avoid re-renders
const libraries: ('places')[] = ['places'];

export const useMap = () => {
  const currentPlace = useSelector(currentPlaceSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const [selectedMarker, setSelectedMarker] = useState<Place | null>(null);
  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  const hasApiKey = apiKey && apiKey.length > 0;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const center = currentPlace?.location ?? defaultCenter;

  const onMarkerClick = useCallback((place: Place) => {
    setSelectedMarker(place);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  return {
    currentPlace,
    isLoading,
    error,
    selectedMarker,
    hasApiKey,
    isLoaded,
    loadError,
    center,
    onMarkerClick,
    onInfoWindowClose,
  };
};
