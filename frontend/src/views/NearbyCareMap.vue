<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { providersToGeoJSON } from '@/data/providers'

// required styles
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const mapEl = ref(null)
const status = ref('Initializing map…')
const error = ref('')
let map

onMounted(() => {
  const token = import.meta.env.VITE_MAPBOX_TOKEN
  if (!token) {
    error.value = 'VITE_MAPBOX_TOKEN is missing. Create .env.local and restart dev server.'
    status.value = ''
    console.warn('No Mapbox token found. Add VITE_MAPBOX_TOKEN=pk.xxxxxx to .env.local')
    return
  }

  // mask token when logging
  console.log('Mapbox token:', token.slice(0, 10) + '…')

  mapboxgl.accessToken = token
  try {
    map = new mapboxgl.Map({
      container: mapEl.value,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [144.9631, -37.8136], // Melbourne
      zoom: 11
    })
  } catch (e) {
    error.value = 'Failed to create map: ' + (e?.message || e)
    status.value = ''
    return
  }

  map.addControl(new mapboxgl.NavigationControl(), 'top-right')
  map.addControl(new mapboxgl.FullscreenControl(), 'top-right')
  map.addControl(new mapboxgl.GeolocateControl({ trackUserLocation: true }), 'top-right')

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
    marker: true,
    placeholder: 'Search places…'
  })
  map.addControl(geocoder, 'top-left')

  map.on('error', (e) => {
    console.error('Map error:', e?.error || e)
    // Keep showing the page; most non-fatal errors are OK
  })

  map.on('load', () => {
    status.value = ''
    // test marker so you can see something for sure
    new mapboxgl.Marker().setLngLat([144.9631, -37.8136]).addTo(map)
  })

  map.addSource('providers', {
  type: 'geojson',
  data: providersToGeoJSON(),
})
})

onBeforeUnmount(() => {
  if (map) map.remove()
})
</script>

<template>
  <section class="page">
    <div v-if="status" class="msg info">{{ status }}</div>
    <div v-if="error" class="msg error">{{ error }}</div>
    <div ref="mapEl" id="map" />
  </section>
</template>

<style scoped>
.page { padding: 12px; }
#map {
  width: 100%;
  height: 80vh;           /* ensure visible height */
  min-height: 420px;
  border-radius: 12px;
  background: #f3f4f6;    /* shows container even if map fails */
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.03);
}
.msg {
  margin: 8px 0 12px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
}
.msg.info  { background: #eef2ff; color: #243b74; }
.msg.error { background: #fee2e2; color: #7f1d1d; }
</style>