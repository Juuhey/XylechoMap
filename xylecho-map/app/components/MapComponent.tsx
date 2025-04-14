"use client";
import { useEffect, useRef } from "react";
import { Project } from "@/app/models/Projects";

import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import GestureHandling from "leaflet-gesture-handling";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

import {isMobile} from "react-device-detect";

interface MapComponentProps {
  projects: Project[] | null;
}

export default function MapComponent({ projects }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    //
    if (projects && projects.length && !mapRef.current) {
      
      // gestureHandling
      L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

      const mapOptions: L.MapOptions = {
        center: [43.183331, 3],
        zoom: 10,
        gestureHandling: true,
        gestureHandlingOptions: {
          text: {
            touch: "Utilisez deux doigts pour déplacer la carte",
            scroll: "Utilisez Ctrl + molette pour zoomer sur la carte",
            scrollMac: "Utilisez ⌘ + molette pour zoomer sur la carte",
          },
        },
      };
      
      const map = L.map("map", mapOptions);
      mapRef.current = map;
      
      const Street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 15,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const Satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 15,
        attribution: "&copy; Esri, Maxar, Earthstar Geographics",
      });

      const Sombre = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 15,
        attribution: "&copy; Carto",
      });

      // Fonction pour déterminer la couleur d'un cluster en fonction du nombre d'éléments
      const getClusterColor = (count: number) => {
        if (count <= 5) return {fill: "#F5EC7B", border: "#FAF6C0"};  // 0-5 projets
        if (count <= 10) return {fill: "#EBE457", border: "#F5EC7B"};   // 6-10 projets
        if (count <= 15) return {fill: "#E2C94D", border: "#EBE457"};  // 11-15 projets
        return {fill: "#E2B013", border: "#E2C94D"};                // +20 projets
      };

      // Création du groupe de clusters
      const markers = L.markerClusterGroup({

        // Options de clusterisation
        maxClusterRadius: (zoom) => {
          // Retourne une valeur plus petite pour les zooms plus élevés
          return zoom > 10 ? 20 : zoom > 15 ? 20 : zoom > 20 ? 25 : 25;
        },

        // Définition de la fonction pour créer l'icône du cluster
        iconCreateFunction: (cluster) => {
          const markersCount = cluster.getChildCount();
          const radius = 17 + markersCount / 2;

          const color = getClusterColor(markersCount).border;
          const fillColor = getClusterColor(markersCount).fill;

          return new L.DivIcon({
            html: `<div style="
            background-color: ${color};
            border-color: ${fillColor};
            width: ${radius * 2}px;
            height: ${radius * 2}px;
            border-radius: 50%;
            border-width: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            font-weight: bold;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
            ">
              ${markersCount}
            </div>`,
            className: "leaflet-markercluster",
            iconSize: new L.Point(radius * 2, radius * 2),
          });
        },
      });

      projects.forEach((project) => {
        const lat = parseFloat(project.latitude || "");
        const lng = parseFloat(project.longitude || "");
      
        if (!isNaN(lat) && !isNaN(lng)) {
          const radius = 17;
          const customIcon = new L.DivIcon({
            html: `<div style="
            background-color: white;
            border-color: #FAF6C0;
            width: ${radius * 2}px;
            height: ${radius * 2}px;
            border-radius: 50%;
            border-width: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            font-weight: bold;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
            ">
              1
            </div>`,
            className: "",
            iconSize: new L.Point(radius * 2, radius * 2),
          });
      
          // Ajouter le marqueur avec l'icône personnalisée
          L.marker([lat, lng], { icon: customIcon })
            .addTo(markers)
            .bindPopup(`
              <b>${project.name}</b>
              <br>
              ${project.ville}, ${project.year}
              <br>
              ${project.object}
            `)
        }
      });

      map.addLayer(markers);

      L.control.layers(
        { Street, Satellite, Sombre },
        { Projets: markers }
      ).addTo(map);
    }
    
    // Fonction de nettoyage pour éviter les fuites de mémoire
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [projects]);

  // Message d'instructions pour les gestes
  const gestureMsg = isMobile 
    ? "Utilisez deux doigts pour déplacer la carte" 
    : "Utilisez Ctrl / ⌘ + molette pour zoomer sur la carte";

  return (
    <div className="map-container" style={{ position: "relative", height: "100vh", width: "100%" }}>
      <div id="map" style={{ height: "100%", width: "100%" }} />
      {!isMobile && (
        <div
          className="gesture-message"
          style={{
            position: "absolute",
            color: "white",
            bottom: "20px",
            left: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "8px 12px",
            borderRadius: "5px",
            fontSize: "14px",
            zIndex: 1000,
            pointerEvents: "none" // clic through
          }}
        >
          {gestureMsg}
        </div>
      )}
    </div>
  );
}