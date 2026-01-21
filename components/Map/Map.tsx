'use client';

import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Card, Spin, Alert } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { Place } from '@/types/place';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '8px',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060, // New York City
};

const Map: React.FC = () => {
  const { currentPlace, isLoading, error } = useAppSelector((state) => state.places);
  const [selectedMarker, setSelectedMarker] = useState<Place | null>(null);
  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const hasApiKey = apiKey && apiKey.length > 0;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const center = currentPlace?.location || defaultCenter;

  const onMarkerClick = useCallback((place: Place) => {
    setSelectedMarker(place);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  if (loadError) {
    return (
      <Alert
        message="Map Loading Error"
        description="Failed to load Google Maps. Please check your API key."
        type="error"
        showIcon
      />
    );
  }

  if (!hasApiKey) {
    return (
      <Card
        style={{
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0f2f5',
        }}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Alert
            message="Google Maps API Key Required"
            description={
              <div>
                <p>To display the map, please add your Google Maps API key.</p>
                <p>Create a <code>.env.local</code> file and add:</p>
                <pre style={{ 
                  background: '#fff', 
                  padding: '12px', 
                  borderRadius: '4px',
                  marginTop: '12px',
                  textAlign: 'left'
                }}>
                  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
                </pre>
                {currentPlace && (
                  <div style={{ marginTop: '16px' }}>
                    <p><strong>Selected Location:</strong></p>
                    <p>{currentPlace.name}</p>
                    <p>{currentPlace.formattedAddress}</p>
                    <p>Coordinates: {currentPlace.location.lat}, {currentPlace.location.lng}</p>
                  </div>
                )}
              </div>
            }
            type="info"
            showIcon
          />
        </div>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card
        style={{
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin size="large" tip="Loading map..." />
      </Card>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            borderRadius: '8px',
          }}
        >
          <Spin size="large" tip="Searching..." />
        </div>
      )}
      
      {error && (
        <Alert
          message="Search Error"
          description={error}
          type="error"
          closable
          style={{ marginBottom: '16px' }}
        />
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={currentPlace ? 14 : 11}
        options={{
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
      >
        {currentPlace && (
          <Marker
            position={currentPlace.location}
            onClick={() => onMarkerClick(currentPlace)}
            animation={window.google?.maps?.Animation?.DROP}
          />
        )}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.location}
            onCloseClick={onInfoWindowClose}
          >
            <div style={{ padding: '8px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
                {selectedMarker.name}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                {selectedMarker.formattedAddress}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
