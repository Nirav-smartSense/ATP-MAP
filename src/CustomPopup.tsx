import React, { useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

function demo(event: any) {
  console.log(event);
}

const CustomPopup = ({ text }: any) => {
  const popupRef = useRef(null);

  return (
    <Popup interactive eventHandlers={{}}>
      {text}
    </Popup>
  );
};

export default CustomPopup;
