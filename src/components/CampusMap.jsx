import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './CampusMap.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibG90dXNlYW5hIiwiYSI6ImNtY2hscGw3YTB4ZXgyanBxcjdma3ZzanMifQ.y79g_FPSdrWaF-Tfjd8G8Q'; // <-- Replace with your real token

const CampusMap = () => {
  const [viewport, setViewport] = useState({
    longitude: -122.4510296415105,
    latitude: 37.725834859394176,
    zoom: 16,
    width: '100vw',
    height: '100vh'
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onViewportChange={setViewport}
    />
  );
};

export default CampusMap; 