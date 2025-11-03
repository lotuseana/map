import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import maskGeoJSON from './assets/mask.json';
import BATL_4 from './coords/batmale_hall/floor_4.json';
import BATL_5 from './coords/batmale_hall/floor_5.json';
import addBATLLayers from './mapLayers/batl'
import addMaskLayer from './mapLayers/mask'

const INITIAL_CENTER = [
  -122.4513,
  37.7257
]
const INITIAL_ZOOM = 16.97
const INITIAL_PITCH = 70
const INITIAL_BEARING = 89.7

function App() {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [pitch, setPitch] = useState(INITIAL_PITCH)
  const [bearing, setBearing] = useState(INITIAL_BEARING)
  const [mouseLngLat, setMouseLngLat] = useState(null) // <-- new state for hover coords
  const maxBounds = [
    [-122.452340, 37.725110],
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
      style: 'mapbox://styles/mapbox/light-v11',
    });

    // show precise coords where mouse is hovering
    const onMouseMove = (e) => {
      // Mapbox event provides e.lngLat with high precision numbers
      setMouseLngLat([e.lngLat.lng, e.lngLat.lat])
    }
    const onMouseLeave = () => setMouseLngLat(null)
    mapRef.current.on('mousemove', onMouseMove)
    // also clear when pointer leaves the map container
    if (mapContainerRef.current) {
      mapContainerRef.current.addEventListener('mouseleave', onMouseLeave)
    }

    mapRef.current.on('move', () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()
      const mapPitch = mapRef.current.getPitch()
      const mapBearing = mapRef.current.getBearing()

      // update state
      setCenter([mapCenter.lng, mapCenter.lat])
      setZoom(mapZoom)
      setPitch(mapPitch)
      setBearing(mapBearing)
    })

    // Add 3D terrain and buildings when map loads
    mapRef.current.on('load', () => {
      mapRef.current.setTerrain(null);

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
          'fill-extrusion-opacity': 0.3
        }
      });

      // find a base symbol layer so we can match label style
      const styleLayers = mapRef.current.getStyle().layers || [];
      const baseLabelLayer = styleLayers.find(layer =>
        layer.type === 'symbol' && layer.layout && (layer.layout['text-field'] || layer.layout['icon-image'])
      );
      const baseLayout = baseLabelLayer?.layout || {};
      const basePaint = baseLabelLayer?.paint || {};

      // add mask (separate file)
      addMaskLayer(mapRef.current, maskGeoJSON);
      // add BATL layers (separate file)
      addBATLLayers(mapRef.current, BATL_4, BATL_5, baseLayout, basePaint);
    });

    return () => {
      // remove event listeners and clean up
      if (mapRef.current) {
        mapRef.current.off('mousemove', onMouseMove)
      }
      if (mapContainerRef.current) {
        mapContainerRef.current.removeEventListener('mouseleave', onMouseLeave)
      }
      if (mapRef.current) mapRef.current.remove()
    }
  }, [])

  const handleResetButtonClick = () => {
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

      <button className='reset-button' onClick={handleResetButtonClick}>
        Reset
      </button>

      <div id='map-container' ref={mapContainerRef} />

      {/* mouse coords UI (bottom-right). shows high-precision coordinates while hovering */}
      <div
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12,
          padding: '6px 8px',
          background: 'rgba(255,255,255,0.9)',
          color: '#111',
          fontSize: 12,
          borderRadius: 4,
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          pointerEvents: 'none'
        }}
      >
        {mouseLngLat
          ? `${mouseLngLat[0].toFixed(7)}, ${mouseLngLat[1].toFixed(7)}`
          : 'Hover map to see coords'}
      </div>
    </>
  )
}

export default App