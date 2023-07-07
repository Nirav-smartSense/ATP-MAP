import { AssetTypes } from "./App";
import MarkerClusterGroup from "react-leaflet-cluster";
import CustomMarker from "./CustomMarker";

const RenderLoaction = ({
  locationData,
}: {
  locationData: AssetTypes[] | null | undefined;
}) => {
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
