import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { WildfireRisk } from "@/entities/all";
import { Skeleton } from "@/components/ui/skeleton";
import MapLegend from "../components/map/MapLegend";

const riskColors = {
  very_low: "#059669", // success-green
  low: "#22c55e",
  moderate: "#f97316", // warning-orange
  high: "#ef4444",
  extreme: "#dc2626" // danger-red
};

export default function MapView() {
  const [riskData, setRiskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const position = [56.1304, -106.3468]; // Center of Canada

  useEffect(() => {
    // Import Leaflet CSS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
    link.crossOrigin = '';
    document.head.appendChild(link);

    const loadData = async () => {
      setIsLoading(true);
      try {
        const risks = await WildfireRisk.list("-created_date", 200); // Get up to 200 risk points
        setRiskData(risks);
      } catch (error) {
        console.error("Error loading risk data for map:", error);
      }
      setIsLoading(false);
    };

    loadData();

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const getRadius = (riskScore) => {
    if (!riskScore) return 2000;
    return 2000 + riskScore * 300; // Scale radius from 2km to 32km
  };

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-0 left-0 p-4 z-[1000] w-full bg-gradient-to-b from-black/20 to-transparent">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg" style={{ color: 'var(--forest-primary)' }}>
          Live Wildfire Risk Map
        </h1>
        <p className="text-white drop-shadow-md" style={{ color: 'var(--neutral-gray)' }}>
          Real-time risk visualization across monitored zones
        </p>
      </div>

      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <MapContainer center={position} zoom={4} className="h-full w-full z-0">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {riskData.map(risk => (
            <Circle
              key={risk.id}
              center={[risk.latitude, risk.longitude]}
              pathOptions={{ 
                color: riskColors[risk.risk_level] || 'grey',
                fillColor: riskColors[risk.risk_level] || 'grey',
                fillOpacity: 0.5
              }}
              radius={getRadius(risk.risk_score)}
            >
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-lg" style={{ color: 'var(--forest-primary)' }}>{risk.location_name}</h3>
                  <p><strong>Risk Level:</strong> <span style={{ color: riskColors[risk.risk_level] }}>{risk.risk_level?.replace('_', ' ')}</span></p>
                  <p><strong>Risk Score:</strong> {risk.risk_score}/100</p>
                  <hr className="my-2" />
                  <p><strong>Temp:</strong> {risk.temperature}°C</p>
                  <p><strong>Humidity:</strong> {risk.humidity}%</p>
                  <p><strong>Wind:</strong> {risk.wind_speed} km/h</p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      )}
      <MapLegend riskColors={riskColors} />
    </div>
  );
}