import { AssetTypes } from "./App";
import MarkerClusterGroup from "react-leaflet-cluster";
import CustomMarker from "./CustomMarker";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

const RenderLoaction = ({
  locationData,
}: {
  locationData: AssetTypes[] | null | undefined;
}) => {
  const map = useMap();

  useEffect(() => {
    if (locationData) {
      locationData.forEach((locations) => {
        map.openPopup("<div>NNN</div>", [
          locations.locations[0].latitude,
          locations.locations[0].longitude,
        ]);
      });
    }
  }, [locationData]);

  if (!locationData) {
    return null;
  }

  return (
    <MarkerClusterGroup>
      {locationData.map(({ companyName, locations }) => {
        return locations.map(({ latitude, longitude, createDate }) => (
          <>
            <CustomMarker
              position={[latitude, longitude]}
              createDate={createDate}
              companyName={companyName}
            />
          </>
        ));
      })}
    </MarkerClusterGroup>
  );
};

export default RenderLoaction;
