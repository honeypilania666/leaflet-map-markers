import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LayerGroup } from 'leaflet';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: L.MapOptions = {
    zoom: 9,
    center: L.latLng(28.695912, 77.15226),
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
  };
  map: L.Map;
  markersLayer = new L.LayerGroup();
  sMarkersLayer: LayerGroup;
  zoomLevel = 9;
  iconUrl = 'https://decisionfarm.ca/assets/images/marker-icon-2x.png';
  locations = [
    { lat: 28.695912, lng: 77.15226 },
    { lat: 28.695915, lng: 77.25228 },
    { lat: 28.695917, lng: 77.3523 },
    { lat: 28.705917, lng: 77.4523 },
  ];

  createMarkers() {
    this.sMarkersLayer = new L.LayerGroup();

    for (const s of this.locations) {
      let icon;
      icon = new L.DivIcon({
        html: `<img src='${this.iconUrl}'/>`,
      });
      const marker = L.marker([s.lat, s.lng], { icon });
      this.sMarkersLayer.addLayer(marker);
    }
    this.markersLayer.addLayer(this.sMarkersLayer);
  }

  onMapReady(map: L.Map) {
    setTimeout(() => {
      this.map = map;
      map.addLayer(this.markersLayer);
      this.createMarkers();
    }, 200);
  }

  ngOnInit() {}
}
