<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Geocoder for place search
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const props = defineProps({
  // rows: [{ id, name, address, coords:[lng,lat], ... }]
  rows: { type: Array, default: () => [] }
})
const emit = defineEmits(['select'])

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN
const hasToken = !!TOKEN

const mapEl = ref(null)
let map

// ---------- helpers ----------
const asLngLat = (r) => {
  if (!r) return null
  if (Array.isArray(r.coords) && r.coords.length === 2) {
    const lng = Number(r.coords[0])
    const lat = Number(r.coords[1])
    if (Number.isFinite(lng) && Number.isFinite(lat)) return [lng, lat]
  }
  return null
}

const toGeoJSON = (list = []) => {
  const feats = []
  for (const r of list) {
    const c = asLngLat(r)
    if (!c) continue
    feats.push({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: c },
      properties: {
        id: String(r.id),
        name: r.name || '',
        address: r.address || '',
        type: r.type || '',
        postcode: r.postcode || ''
      }
    })
  }
  return { type: 'FeatureCollection', features: feats }
}

const fc = computed(() => toGeoJSON(props.rows))

function fitToFeatures(collection) {
  if (!map) return
  const feats = collection?.features || []
  if (!feats.length) return
  const b = new mapboxgl.LngLatBounds()
  feats.forEach(f => b.extend(f.geometry.coordinates))
  if (!b.isEmpty()) map.fitBounds(b, { padding: 40, duration: 0 })
}

function ensureSource() {
  if (!map) return
  const src = map.getSource('providers')
  if (!src) {
    map.addSource('providers', { type: 'geojson', data: fc.value })
    map.addLayer({
      id: 'providers-pts',
      type: 'circle',
      source: 'providers',
      paint: {
        'circle-radius': 6,
        'circle-color': '#2563eb',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    })

    // Click a point: show popup + actions (Directions / View details)
    map.on('click', 'providers-pts', (e) => {
      const f = e.features && e.features[0]
      if (!f) return
      const id = f.properties?.id
      const name = f.properties?.name || ''
      const address = f.properties?.address || ''
      const coords = f.geometry.coordinates.slice()
      const [lng, lat] = coords

      const html = `
        <div class="wh-popup">
          <strong>${name}</strong><br/>
          ${address}<br/>
          <div class="wh-actions">
            <a class="wh-dir"
               href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}"
               target="_blank" rel="noopener">Directions</a>
            <button class="wh-view" data-id="${id}">View details</button>
          </div>
        </div>`

      const popup = new mapboxgl.Popup({ closeButton: true, offset: 10 })
        .setLngLat(coords)
        .setHTML(html)
        .addTo(map)

      // Wire up "View details" button
      const root = popup.getElement()
      const btn = root.querySelector('.wh-view')
      if (btn) btn.onclick = () => emit('select', id)
    })

    map.on('mouseenter', 'providers-pts', () => (map.getCanvas().style.cursor = 'pointer'))
    map.on('mouseleave', 'providers-pts', () => (map.getCanvas().style.cursor = ''))
  } else {
    src.setData(fc.value)
  }
  fitToFeatures(fc.value)
}

// ---------- lifecycle ----------
onMounted(() => {
  if (!hasToken) return
  mapboxgl.accessToken = TOKEN
  map = new mapboxgl.Map({
    container: mapEl.value,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [144.9631, -37.8136], // Melbourne
    zoom: 10
  })

  // Basic navigation (zoom/rotate)
  map.addControl(new mapboxgl.NavigationControl(), 'top-right')

  // ⬇️ Geolocate (user location + heading)
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true
    }),
    'top-left'
  )

  // ⬇️ Place search (Mapbox Geocoder)
  map.addControl(
    new MapboxGeocoder({
      accessToken: TOKEN,
      mapboxgl,
      marker: false,
      placeholder: 'Search places…'
    }),
    'top-left'
  )

  map.on('load', ensureSource)
})

watch(fc, () => ensureSource(), { deep: true })

onBeforeUnmount(() => {
  if (map) map.remove()
})
</script>

<template>
  <div class="map-wrapper">
    <div v-if="!hasToken" class="alert alert-danger mb-2">
      VITE_MAPBOX_TOKEN is missing. Create .env.local and restart dev server.
    </div>
    <div ref="mapEl" class="wh-map"></div>
  </div>
</template>

<style scoped>
.wh-map {
  width: 100%;
  min-height: 420px;
  border-radius: 12px;
  background: #f5f6f8;
  overflow: hidden;
}

/* Popup actions */
.wh-popup { font-size: 0.875rem; line-height: 1.35; }
.wh-actions { margin-top: .5rem; display: flex; gap: .5rem; align-items: center; }
.wh-dir {
  text-decoration: none;
  padding: .25rem .5rem;
  border-radius: 6px;
  background: #111827;
  color: #fff;
}
.wh-view {
  border: 0;
  padding: .25rem .6rem;
  border-radius: 6px;
  background: #0d6efd;
  color: #fff;
  cursor: pointer;
}
</style>