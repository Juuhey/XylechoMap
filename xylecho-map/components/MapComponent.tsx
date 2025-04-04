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

    // Fonction pour déterminer la couleur d'un cluster en fonction du nombre d'éléments
    const getClusterColor = (count: number) => {
      if (count <= 5) return "#e8e226";  // 0-5 projets
      if (count <= 10) return "orange";   // 6-10 projets
      if (count <= 15) return "red";   // 11-15 projets
      return "purple";                       // +20 projets
    };

    // Création du groupe de clusters
    const markers = L.markerClusterGroup({
      // Définition de la fonction pour créer l'icône du cluster
      iconCreateFunction: (cluster) => {
        const markersCount = cluster.getChildCount();
        const radius = 20 + markersCount / 2; // Calcul du rayon en fonction du nombre de projets
        const color = getClusterColor(markersCount); // Détermination de la couleur du cluster

        return new L.DivIcon({
          html: `<div style="background-color: ${color}; width: ${radius * 2}px; height: ${radius * 2}px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold;">${markersCount}</div>`,
          className: "leaflet-markercluster",
          iconSize: new L.Point(radius * 2, radius * 2),
        });
      },
    });

    projects.forEach((project) => {
      const lat = parseFloat(project.latitude || "");
      const lon = parseFloat(project.longitude || "");

      if (!isNaN(lat) && !isNaN(lon)) {
        L.circleMarker([lat, lon], {
          color: "blue",
          fillColor: "blue",
          fillOpacity: 0.5,
          radius: 20,
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
