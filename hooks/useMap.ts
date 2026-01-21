import { useState, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { currentPlaceSelector, isLoadingSelector, errorSelector } from '@/store/selectors';
import { APP_CONFIG } from '@/constants';
import { getGoogleMapsApiKey, trackMapInteraction } from '@/utils';

export const useMap = () => {
  const currentPlace = useSelector(currentPlaceSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const [selectedMarker, setSelectedMarker] = useState<Place | null>(null);
  
  const apiKey = getGoogleMapsApiKey();
  const hasApiKey = apiKey.length > 0;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: APP_CONFIG.GOOGLE_MAPS_LIBRARIES,
  });

  const center = currentPlace?.location ?? APP_CONFIG.DEFAULT_CENTER;

  const onMarkerClick = useCallback((place: Place) => {
    trackMapInteraction('marker_click', place.name);
    setSelectedMarker(place);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    trackMapInteraction('info_window_close');
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
