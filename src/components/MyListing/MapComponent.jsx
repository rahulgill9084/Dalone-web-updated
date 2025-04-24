import React, { useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { loadGoogleMaps } from "@/utils";
import { settingsData } from "@/redux/reuducer/settingSlice";
import { useSelector } from "react-redux";
import { useState } from "react"; // already imported? skip

const MapComponent = ({ getLocationWithMap, Location }) => {
  const [showMap, setShowMap] = useState(false);
  const systemSettingsData = useSelector(settingsData);
  const settings = systemSettingsData?.data;
  const { isLoaded } = loadGoogleMaps();

  useEffect(() => {
    if (window.google && isLoaded) {
      // Initialize any Google Maps API-dependent logic here
    }
  }, [isLoaded]);
  const containerStyle = {
    marginTop: "30px",
    width: "100%",
    height: "400px",
  };

  const latitude = Number(settings?.default_latitude);
  const longitude = Number(settings?.default_longitude);

  const center = {
    lat: Number(Location?.lat) || latitude,
    lng: Number(Location?.long) || longitude,
  };
  const handleMapClick = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    getLocationWithMap(newPosition);
  };

  const position = {
    lat: Number(Location?.lat),
    lng: Number(Location?.long),
  };

  return (
    <>
      {!showMap && (
        <div style={{ marginBottom: "1rem" }}>
          <button className="btn btn-primary" onClick={() => setShowMap(true)}>
            Use Current Location
          </button>
        </div>
      )}

      <div
        className="or-divider"
        style={{ textAlign: "center", margin: "1rem 0", fontWeight: "bold" }}
      >
        OR
      </div>

      {isLoaded && showMap && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onClick={handleMapClick}
        >
          {position && <Marker position={position} />}
        </GoogleMap>
      )}
    </>
  );
};

export default MapComponent;
