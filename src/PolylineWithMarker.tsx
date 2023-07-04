import { AssetTypes } from "./App";
import { Marker, Polyline, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import markerIcon from "../public/marker-icon.png";

const limeOptions = { color: "black" };

const customIcon = new Icon({
  iconUrl: markerIcon,
  iconSize: [20, 30],
});

const PolylineWithMarker = ({
  asset,
  showCurrent,
}: {
  asset: AssetTypes | null | undefined;
  showCurrent: boolean;
}) => {
  if (!asset) {
    return null;
  }

  if (showCurrent) {
    return (
      <Marker
        position={[asset.locations[0].latitude, asset.locations[0].longitude]}
        icon={customIcon}
      >
        <Tooltip permanent direction="top">
          <div className="popUpMarker">
            <img src={markerIcon} height={20} alt="" />
            <p>{asset.companyName}</p>
          </div>
        </Tooltip>
      </Marker>
    );
  }

  return (
    <>
      <Polyline
        pathOptions={limeOptions}
        positions={asset?.locations.map((data) => {
          return [data.latitude, data.longitude];
        })}
      />
      {asset.locations.map((locationData) => (
        <Marker
          position={[locationData.latitude, locationData.longitude]}
          icon={customIcon}
          key={locationData.createDate}
        >
          <Tooltip permanent direction="top">
            <div className="popUpMarker">
              <img src={markerIcon} height={20} alt="" />
              <p>{asset.companyName}</p>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </>
  );
};

export default PolylineWithMarker;
