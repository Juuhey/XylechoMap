"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

const industriePoints: [number, number][] = [
  [43.1837757, 3.0041906],
  [43.3426562, 3.2131307],
  [43.6112422, 3.8767337],
  [43.6263176, 3.4302412],
];

const tertiairePoints: [number, number][] = [
  [43.6044622, 1.4442469],
  [43.232858, 0.0781021],
  [42.6985304, 2.8953121],
  [44.1253665, 4.0852818],
];

const MapComponent = () => {
  const mapRef = useRef<L.Map | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  if (!isMounted) return null;

  useEffect(() => {
    if (mapRef.current) return; // Ne crée la carte qu'une seule fois

    const map = L.map("map").setView([43.183331, 3], 10);
    mapRef.current = map;

    const Street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 11,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const Esri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 11,
      attribution: "&copy; Esri, Maxar, Earthstar Geographics",
    });

    const Dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 11,
      attribution: "&copy; Carto",
    });

    const industrieCluster = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({
          html: `<div style="background-color: red; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">${cluster.getChildCount()}</div>`,
          className: 'custom-cluster',
          iconSize: L.point(40, 40)
        });
      }
    });
    
    const tertiaireCluster = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({
          html: `<div style="background-color: blue; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">${cluster.getChildCount()}</div>`,
          className: 'custom-cluster',
          iconSize: L.point(40, 40)
        });
      }
    });
    
    industriePoints.forEach((pos) => {
      L.circleMarker(pos, {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 40,
      })
        .addTo(industrieCluster)
        .on("click", () => alert("Industrie proche de cette zone."));
    });
    
    tertiairePoints.forEach((pos) => {
      L.circleMarker(pos, {
        color: "blue",
        fillColor: "#03f",
        fillOpacity: 0.5,
        radius: 40,
      })
        .addTo(tertiaireCluster)
        .on("click", () => alert("Tertiaire proche de cette zone."));
    });
    
    map.addLayer(industrieCluster);
    map.addLayer(tertiaireCluster);
    
    L.control.layers(
      { Street, Esri, Dark },
      { Industrie: industrieCluster, Tertiaire: tertiaireCluster }
    ).addTo(map);
  })
  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
  ;
}

export default MapComponent;
