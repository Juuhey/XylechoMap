"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { Project } from "@/app/models/Projects";

interface MapComponentProps {
  projects: Project[] | null;
}

export default function MapComponent({ projects }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!projects || !projects.length || mapRef.current) return;

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

    const markers = L.markerClusterGroup();

    projects.forEach((project) => {
      const lat = parseFloat(project.latitude || "");
      const lon = parseFloat(project.longitude || "");

      if (!isNaN(lat) && !isNaN(lon)) {
        L.circleMarker([lat, lon], {
          color: "purple",
          fillColor: "#800080",
          fillOpacity: 0.6,
          radius: 40,
        })
          .addTo(markers)
          .bindPopup(`<b>${project.name}</b><br>${project.ville}`)
          .on("click", () => console.log(`Projet sélectionné : ${project.name}`));
      }
    });

    map.addLayer(markers);

    L.control.layers(
      { Street, Esri, Dark },
      { Projets: markers }
    ).addTo(map);
  }, [projects]);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
}
