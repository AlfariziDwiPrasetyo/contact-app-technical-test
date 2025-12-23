import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface LocationPickerProps {
  value?: { lat?: number; lng?: number };
  onChange: (location: { lat: number; lng: number }) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    value?.lat && value?.lng ? { lat: value.lat, lng: value.lng } : null
  );

  useEffect(() => {
    if (!mapRef.current) return;

    let isMounted = true;
    let map: any;

    // Reset
    mapRef.current.innerHTML = "";

    import("leaflet").then((L) => {
      if (!isMounted || !mapRef.current) return;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const defaultCenter: [number, number] = [-6.7063, 108.557];
      const center: [number, number] =
        value?.lat && value?.lng ? [value.lat, value.lng] : defaultCenter;

      map = L.map(mapRef.current).setView(center, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      if (value?.lat && value?.lng) {
        markerRef.current = L.marker([value.lat, value.lng]).addTo(map);
      }

      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;

        if (markerRef.current) map.removeLayer(markerRef.current);
        markerRef.current = L.marker([lat, lng]).addTo(map);

        setPosition({ lat, lng });
        onChange({ lat, lng });
      });
    });

    return () => {
      isMounted = false;

      if (map) {
        map.off();
        map.remove();
      }

      markerRef.current = null;
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="map-container">
        <div
          key="leaflet-map"
          ref={mapRef}
          style={{ height: "100%", width: "100%" }}
        />
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        {position ? (
          <span>
            Koordinat:{" "}
            <span className="font-medium text-foreground">
              {position.lat.toFixed(6)}
            </span>
            ,{" "}
            <span className="font-medium text-foreground">
              {position.lng.toFixed(6)}
            </span>
          </span>
        ) : (
          <span>Klik pada peta untuk memilih lokasi</span>
        )}
      </div>
    </div>
  );
}
