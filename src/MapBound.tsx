import { LatLngTuple } from "leaflet";
import React from "react";
import { useMap } from "react-leaflet";

type MapBoundProps = {
  bound: LatLngTuple[];
};

const MapBound = ({ bound }: MapBoundProps) => {
  const map = useMap();
  map.fitBounds(bound);
  return null;
};

export default MapBound;
