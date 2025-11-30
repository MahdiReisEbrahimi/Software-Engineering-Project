import * as L from 'leaflet';

declare module 'leaflet' {
  function markerClusterGroup(options?: any): L.MarkerClusterGroup;

  interface MarkerClusterGroup extends L.LayerGroup {
    addLayer(layer: L.Layer): this;
    removeLayer(layer: L.Layer): this;
    clearLayers(): this;
    getBounds(): L.LatLngBounds;
  }
}
