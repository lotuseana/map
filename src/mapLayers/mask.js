export default function addMaskLayer(map, maskGeoJSON, opts = {}) {
  if (!map || !maskGeoJSON) return;

  // avoid adding twice
  if (map.getSource && map.getSource('mask')) return;

  map.addSource('mask', {
    type: 'geojson',
    data: maskGeoJSON
  });

  map.addLayer({
    id: 'mask-layer',
    type: 'clip',
    source: 'mask',
    layout: {
      'clip-layer-types':['model','symbol']
    }
  });
}