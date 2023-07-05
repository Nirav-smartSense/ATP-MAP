import { AssetTypes } from "./App";
import { Marker, Tooltip } from "react-leaflet";
import markerIcon from "../public/transparent_img.png";
import companyLogo from "../public/marker-icon.png";
import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl: markerIcon,
  iconSize: [20, 30],
});

const RenderLoaction = ({
  locationData,
}: {
  locationData: AssetTypes[] | null | undefined;
}) => {
  if (!locationData) {
    return null;
  }

  return (
    <>
      {locationData.map(({ companyName, locations }) => {
        return locations.map(({ latitude, longitude, createDate }) => (
          <Marker
            position={[latitude, longitude]}
            icon={customIcon}
            key={createDate}
          >
            <Tooltip permanent direction="top">
              <div className="popUpMarker">
                <img src={companyLogo} height={20} alt="" />
                <p>{companyName}</p>
              </div>
            </Tooltip>
          </Marker>
        ));
      })}
    </>
  );
};

export default RenderLoaction;
