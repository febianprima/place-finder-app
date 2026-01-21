export const PLACES_INITIAL_STATE: PlacesState = {
  currentPlace: {
    id: 'default-maybank-tower',
    name: 'Maybank Tower',
    formattedAddress: '100, Jalan Tun Perak, Kuala Lumpur City Centre, 50050 Kuala Lumpur, Malaysia',
    location: {
      lat: 3.1488,
      lng: 101.7140,
    },
    types: ['point_of_interest', 'establishment'],
  },
  searchHistory: [],
  isLoading: false,
  error: null,
};
