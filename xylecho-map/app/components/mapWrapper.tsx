// app/components/MapWrapper.tsx
"use client";

import dynamic from "next/dynamic";
import { Project } from "@/app/models/Projects";

// ⛔️ Le composant MapComponent utilise Leaflet → uniquement client-side
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

interface MapWrapperProps {
  projects: Project[];
}

export default function MapWrapper({ projects }: MapWrapperProps) {
  return <MapComponent projects={projects} />;
}
