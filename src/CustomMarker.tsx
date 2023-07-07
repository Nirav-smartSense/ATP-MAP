import React, { useEffect, useRef, useState } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import companyLogo from "../public/placeholder.png";
import markerIcon from "../public/marker-icon.png";
import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl: markerIcon,
  iconSize: [20, 30],
});

const CustomMarker = ({ position, companyName, createDate }: any) => {
  return (
    <Marker position={position} icon={customIcon} key={createDate} interactive>
      <Popup closeButton={false}>kklk</Popup>
      <Tooltip direction="top">
        <div className="popUpMarker">
          <div className="imgSection">
            <img src={companyLogo} alt="" />
          </div>
          <div className="tooltipText">
            <p>{companyName}</p>
          </div>
        </div>
      </Tooltip>
    </Marker>
  );
};

export default CustomMarker;
