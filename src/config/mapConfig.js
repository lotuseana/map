// Map Configuration
// All map settings can be customized here or via environment variables

export const MAP_CONFIG = {
  // Mapbox Access Token
  accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibG90dXNlYW5hIiwiYSI6ImNtY2hsbHoweTB1cnoycW9keTc4dXRwdTIifQ.P3V0kXXqjsTDRBs3jTWSnA',
  
  // Initial Map Position
  center: [
    parseFloat(import.meta.env.VITE_CAMPUS_CENTER_LONGITUDE) || -122.45111725386927,
    parseFloat(import.meta.env.VITE_CAMPUS_CENTER_LATITUDE) || 37.726283987033476
  ],
  
  // Initial Map Settings
  zoom: parseInt(import.meta.env.VITE_INITIAL_ZOOM) || 16,
  pitch: parseInt(import.meta.env.VITE_INITIAL_PITCH) || 45,
  bearing: parseInt(import.meta.env.VITE_INITIAL_BEARING) || 0,
  
  // Map Style
  style: import.meta.env.VITE_MAP_STYLE || 'mapbox://styles/mapbox/streets-v12',
  
  // 3D Building Settings
  buildings: {
    minZoom: 15,
    color: '#aaa',
    opacity: 0.6
  },
  
  // Terrain Settings
  terrain: {
    color: '#ff11aa',
    width: 1
  }
}

// Helper function to get config with defaults
export const getMapConfig = (key, defaultValue) => {
  return MAP_CONFIG[key] || defaultValue
} 