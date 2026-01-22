/**
 * Fallback query result data for autocomplete
 * Used when Google Places API is unavailable or returns errors
 */

export const FALLBACK_QUERY_RESULT_DATA: Place[] = [
  {
    id: 'fallback-1',
    name: 'Petronas Twin Towers',
    formattedAddress: 'Kuala Lumpur City Centre, Kuala Lumpur, Malaysia',
    location: { lat: 3.1578, lng: 101.7119 },
    types: ['tourist_attraction', 'point_of_interest'],
    placeId: 'fallback-petronas',
  },
  {
    id: 'fallback-2',
    name: 'Batu Caves',
    formattedAddress: 'Gombak, Selangor, Malaysia',
    location: { lat: 3.2379, lng: 101.6841 },
    types: ['tourist_attraction', 'hindu_temple', 'place_of_worship'],
    placeId: 'fallback-batu-caves',
  },
  {
    id: 'fallback-3',
    name: 'Merdeka Square',
    formattedAddress: 'Jalan Raja, Kuala Lumpur, Malaysia',
    location: { lat: 3.1478, lng: 101.6953 },
    types: ['tourist_attraction', 'point_of_interest'],
    placeId: 'fallback-merdeka',
  },
  {
    id: 'fallback-4',
    name: 'Kuala Lumpur Tower',
    formattedAddress: 'Jalan Puncak, Kuala Lumpur, Malaysia',
    location: { lat: 3.1529, lng: 101.7033 },
    types: ['tourist_attraction', 'point_of_interest'],
    placeId: 'fallback-kl-tower',
  },
  {
    id: 'fallback-5',
    name: 'Sunway Lagoon',
    formattedAddress: 'Bandar Sunway, Petaling Jaya, Selangor, Malaysia',
    location: { lat: 3.0688, lng: 101.6054 },
    types: ['amusement_park', 'tourist_attraction'],
    placeId: 'fallback-sunway',
  },
  {
    id: 'fallback-6',
    name: 'Central Park',
    formattedAddress: 'New York, NY, USA',
    location: { lat: 40.7829, lng: -73.9654 },
    types: ['park', 'tourist_attraction'],
    placeId: 'fallback-central-park',
  },
  {
    id: 'fallback-7',
    name: 'Eiffel Tower',
    formattedAddress: 'Champ de Mars, Paris, France',
    location: { lat: 48.8584, lng: 2.2945 },
    types: ['tourist_attraction', 'point_of_interest'],
    placeId: 'fallback-eiffel',
  },
  {
    id: 'fallback-8',
    name: 'Tokyo Tower',
    formattedAddress: 'Minato City, Tokyo, Japan',
    location: { lat: 35.6586, lng: 139.7454 },
    types: ['tourist_attraction', 'point_of_interest'],
    placeId: 'fallback-tokyo-tower',
  },
  {
    id: 'fallback-9',
    name: 'Sydney Opera House',
    formattedAddress: 'Sydney NSW, Australia',
    location: { lat: -33.8568, lng: 151.2153 },
    types: ['tourist_attraction', 'performing_arts_theater'],
    placeId: 'fallback-sydney-opera',
  },
  {
    id: 'fallback-10',
    name: 'Big Ben',
    formattedAddress: 'Westminster, London, United Kingdom',
    location: { lat: 51.5007, lng: -0.1246 },
    types: ['tourist_attraction', 'point_of_interest'],
    placeId: 'fallback-big-ben',
  },
];
