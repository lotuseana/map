export default function addBATLLayers(map, BATL_4, BATL_5, baseLayout = {}, basePaint = {}) {
  if (!map) return;

  // merge floors and add per-feature height/base
  const merged = {
    type: 'FeatureCollection',
    features: [
      ...(BATL_4?.features || []).map(f => ({
        ...f,
        properties: { ...(f.properties || {}), height: 5.25, base: 0 }
      })),
      ...(BATL_5?.features || []).map(f => ({
        ...f,
        properties: { ...(f.properties || {}), height: 10.5, base: 5.25 }
      }))
    ]
  };

  // add source (id: BATL_all)
  map.addSource('BATL_all', { type: 'geojson', data: merged });

  // extrusion layer (data-driven) — always add
  map.addLayer({
    id: 'BATL-extrusions',
    type: 'fill-extrusion',
    source: 'BATL_all',
    paint: {
      'fill-extrusion-color': ['coalesce', ['get', 'color'], '#ff0000'],
      'fill-extrusion-height': ['coalesce', ['get', 'height'], 0],
      'fill-extrusion-base': ['coalesce', ['get', 'base'], 0],
      'fill-extrusion-opacity': 0.6,
      'fill-extrusion-line-width': 0.1
    }
  });

    map.addLayer({
    id: 'BATL-floors',
    type: 'fill',
    source: 'BATL_all',
    paint: {
      'fill-color': '#ff0000',
      'fill-opacity': 0.5,
      'fill-z-offset':['coalesce', ['get', 'base'], 0],
    }
  });


  // labels: always add
  map.addLayer({
    id: 'BATL-labels',
    type: 'symbol',
    source: 'BATL_all',
    layout: {
      'text-field': ['coalesce', ['to-string', ['get', 'id']], ''],
      'text-font': baseLayout['text-font'] || ['Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-size': baseLayout['text-size'] ?? 12,
      'symbol-placement': 'point',
      'text-anchor': 'center',
      'text-allow-overlap': true,
      'text-ignore-placement': true
    },
    paint: {
      'text-color': basePaint['text-color'] || '#202',
      'text-halo-color': basePaint['text-halo-color'] || '#fff',
      'text-halo-width': basePaint['text-halo-width'] ?? 1,
      'symbol-z-offset': ['coalesce', ['get', 'base'], 0],
      // note: keep any additional paint properties as needed
    }
  });

  // best-effort ordering (no pre-checks)
  try { map.moveLayer('BATL-labels'); } catch (e) {}
  
  try { map.moveLayer('BATL-extrusions'); } catch (e) {}
  try { map.moveLayer('BATL-floors', '3d-buildings'); } catch (e) {}
}