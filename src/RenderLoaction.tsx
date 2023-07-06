import { AssetTypes } from "./App";
import { Marker, Popup, Rectangle, Tooltip, useMap } from "react-leaflet";
import markerIcon from "../public/marker-icon.png";
import companyLogo from "../public/placeholder.png";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useRef } from "react";
import CustomPopup from "./CustomPopup";

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

  // const popupRef = useRef(null);

  // useEffect(() => {
  //   if (popupRef.current) {
  //     console.log(popupRef);
  //     popupRef.current.openPopup();
  //   }
  // }, []);

  return (
    <MarkerClusterGroup>
      {locationData.map(({ companyName, locations }) => {
        return locations.map(({ latitude, longitude, createDate }) => (
          <Marker
            position={[latitude, longitude]}
            icon={customIcon}
            key={createDate}
            interactive
            eventHandlers={{
              click: (event) => console.log(event),
              mouseover: (event) => console.log(event, "mouseover"),
              layeradd: (event) => console.log(event, "layer"),
              loading: (event) => console.log(event, "layer"),
              autopanstart: (event) => console.log(event, "layer"),
              overlayadd: (event) => console.log(event, "overkt"),
            }}
          >
            <CustomPopup text={"ksjd"} />
            <Tooltip direction="top">
              <div className="assetData">
                <div className="imgSection">
                  <img src={companyLogo} height={20} alt="" />
                </div>
                <div className="assetDescription">
                  <p>{companyName}</p>
                </div>
              </div>
            </Tooltip>
          </Marker>
        ));
      })}
    </MarkerClusterGroup>
  );
};

export default RenderLoaction;
