"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { getWebflowProjects } from "app/lib/webflowProjects"; // Import de la fonction

const MapComponent = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [projects, setProjects] = useState<any[]>([]); // Initialisation avec un tableau vide

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWebflowProjects();
        setProjects(data ?? []); // Assurer que `data` est toujours un tableau
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!projects.length || mapRef.current) return; // Ne pas recréer la carte si elle existe

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
      const lat = parseFloat(project.latitude);
      const lon = parseFloat(project.longitude);

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
  }, [projects]); // Exécuter ce useEffect quand projects est mis à jour

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default MapComponent;
