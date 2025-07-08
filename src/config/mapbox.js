// Mapbox configuration
export const MAPBOX_CONFIG = {
  // Replace this with your actual Mapbox access token
  // Get one at: https://account.mapbox.com/access-tokens/
  ACCESS_TOKEN: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_ACCESS_TOKEN',
  
  // Default map style
  MAP_STYLE: 'mapbox://styles/mapbox/streets-v12',
  
  // Default view state (centered at your campus)
  DEFAULT_VIEW: {
    longitude: -122.4510296415105,
    latitude: 37.725834859394176,
    zoom: 16
  }
};

// Campus configuration
export const CAMPUS_CONFIG = {
  name: "Your College Campus",
  description: "Interactive campus map with building locations and information",
  
  // Centered at your campus
  center: {
    longitude: -122.4510296415105,
    latitude: 37.725834859394176
  },
  
  // Map bounds (optional)
  bounds: {
    north: 37.7300,
    south: 37.7200,
    east: -122.4450,
    west: -122.4550
  }
}; 