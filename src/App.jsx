import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import maskGeoJSON from './assets/mask.json';

const INITIAL_CENTER = [
  -122.45111725386927,
  37.726283987033476
]
const INITIAL_ZOOM = 17.5
const INITIAL_PITCH = 70
const INITIAL_BEARING = 89.9

function App() {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [pitch, setPitch] = useState(INITIAL_PITCH)
  const [bearing, setBearing] = useState(INITIAL_BEARING)
  const maxBounds = [
    [ -122.452340, 37.725110],
    [-122.447963, 37.728228]
  ]


  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibG90dXNlYW5hIiwiYSI6ImNtY2hsbHoweTB1cnoycW9keTc4dXRwdTIifQ.P3V0kXXqjsTDRBs3jTWSnA'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center, 
      zoom: zoom,
      pitch: pitch, // Add 3D tilt (0 = flat, 60 = very steep)
      bearing: bearing, // Rotation (0 = north up)
      style: 'mapbox://styles/mapbox/streets-v12',
      maxBounds: maxBounds
    });

    mapRef.current.on('move', () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()
      const mapPitch = mapRef.current.getPitch()
      const mapBearing = mapRef.current.getBearing()

      // update state
      setCenter([ mapCenter.lng, mapCenter.lat ])
      setZoom(mapZoom)
      setPitch(mapPitch)
      setBearing(mapBearing)
    })

    // Add 3D terrain and buildings when map loads
    mapRef.current.on('load', () => {
      // Add 3D terrain
      mapRef.current.addSource('mapbox-terrain', {
        'type': 'vector',
        'url': 'mapbox://mapbox.mapbox-terrain-v2'
      });
      
      mapRef.current.addLayer({
        'id': 'terrain',
        'source': 'mapbox-terrain',
        'source-layer': 'contour',
        'type': 'line',
        'paint': {
          'line-color': '#ff11aa',
          'line-width': 1
        }
      });

      // Add 3D building extrusions
      mapRef.current.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      });

      mapRef.current.addSource('mask', {
        type: 'geojson',
        data: maskGeoJSON
      });
      mapRef.current.addLayer({
        id: 'mask-layer',
        type: 'fill',
        source: 'mask',
        paint: {
          'fill-color': '#000',
          'fill-opacity': 0.5
        }
      });
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])

  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      pitch: INITIAL_PITCH,
      bearing: INITIAL_BEARING
    })
  }
  
  
  return (
    <>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)} | Pitch: {pitch.toFixed(1)}° | Bearing: {bearing.toFixed(1)}°
      </div>
      <button className='reset-button' onClick={handleButtonClick}>
        Reset
      </button>
      <div id='map-container' ref={mapContainerRef} />
    </>
  )
  
  
  
}


export default App