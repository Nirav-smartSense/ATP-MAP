import React, { useEffect, useRef, useState } from "react";
import { Marker, Popup, Tooltip, useMap, useMapEvent } from "react-leaflet";
import companyLogo from "../public/placeholder.png";
import markerIcon from "../public/marker-icon.png";
import transparentLogo from "../public/transparent_img.png";

import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl: transparentLogo,
  iconSize: [40, 40],
});

const CustomMarker = ({ position, companyName, logo }: any) => {
  return (
    <Marker
      position={position}
      icon={customIcon}
      interactive
      eventHandlers={{
        add: (event) => {
          event.target.openPopup();
        },
      }}
    >
      <Popup
        closeOnClick={false}
        position={position}
        closeButton={false}
        autoClose={false}
        interactive
      >
        <div className="popupSection">
          <div className="logoSection">
            <img src={logo} alt="" />
          </div>
          <div className="popupText">{companyName}</div>
        </div>
      </Popup>
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
