"use client"
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Carte interactive</h1>
      <MapComponent />
    </div>
)}