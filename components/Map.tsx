'use client';

import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Card, Spin, Alert } from 'antd';
import { useMap } from '@/hooks';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '8px',
};

export const Map: React.FC = () => {
  const {
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
  } = useMap();

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
      <Card className="h-[200px] flex items-center justify-center bg-gray-100">
        <div className="text-center p-5">
          <Alert
            message="Google Maps API Key Required"
            description={
              <div>
                <p>To display the map, please add your Google Maps API key.</p>
                <p>Create a <code>.env.local</code> file and add:</p>
                <pre className="bg-white p-3 rounded mt-3 text-left">
                  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
                </pre>
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
      <Card className="h-[500px] flex items-center justify-center">
        <Spin size="large" tip="Loading map...">
          <div className="h-[400px]" />
        </Spin>
      </Card>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-[1000] rounded-lg">
          <Spin size="large" tip="Searching...">
            <div className="h-[400px]" />
          </Spin>
        </div>
      )}
      
      {error && (
        <Alert
          title="Search Error"
          description={error}
          type="error"
          closable
          className="mb-4"
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
            <div className="p-2">
              <h3 className="m-0 mb-2 text-base font-semibold">
                {selectedMarker.name}
              </h3>
              <p className="m-0 text-sm text-gray-600">
                {selectedMarker.formattedAddress}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};
