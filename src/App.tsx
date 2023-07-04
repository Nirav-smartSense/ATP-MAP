import "./App.css";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import data from "./data.json";
import RenderLoaction from "./RenderLoaction";
import PolylineWithMarker from "./PolylineWithMarker";

function SetViewOnClick({ location }: any) {
  const map = useMap();
  map.flyTo(location, map.getZoom());
  return null;
}

type AssetLocation = {
  latitude: number;
  longitude: number;
  createDate?: string;
};

export type AssetTypes = {
  assetId: number;
  assetName: string;
  companyName: string;
  companyLogo: string;
  companyBPN: number;
  locations: AssetLocation[];
};

function App() {
  const [currentLocationAsset, setCurrentLocationAsset] = useState<
    null | AssetTypes[]
  >();
  const [asset, setAsset] = useState<null | AssetTypes>();

  //All data
  const responseData = data.data;

  //Default position of Map
  const defaultLocation = () => {
    if (responseData) {
      return [
        responseData[0].locations[0].latitude,
        responseData[0].locations[0].longitude,
      ];
    } else {
      return [23.28, 72.65];
    }
  };

  //Active toggle class function
  const toggleClass = (e: any) => {
    //store deviceName
    const deviceResponse = parseInt(e.target.id);

    if (deviceResponse === asset?.assetId) {
      setAsset(null);
    } else {
      //looking for device name from list
      let assetName = responseData?.find((id) => id.assetId === deviceResponse);

      //set selected device object
      setAsset(assetName);
    }
  };

  useEffect(() => {
    const assetsWithCurrentLoactions = responseData.map((asset) => ({
      ...asset,
      locations: [
        {
          latitude: asset.locations[0].latitude,
          longitude: asset.locations[0].longitude,
        },
      ],
    }));

    setCurrentLocationAsset([...assetsWithCurrentLoactions]);
  }, []);

  //Function for search bar
  const handleSearchChange = (e: any) => {
    console.log(e.currentTarget.value);
  };

  return (
    <>
      <div className="container">
        <div className="mapBox">
          <div className="left-container">
            <h2>Assets</h2>

            <ul>
              {responseData.map((ast) => {
                return (
                  <>
                    <li key={ast.assetId}>
                      <a
                        id={`${ast.assetId}`}
                        className={
                          ast.assetId === asset?.assetId ? "active" : ""
                        }
                        onClick={(e) => toggleClass(e)}
                      >
                        {ast.assetName}
                      </a>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>

          <div className="right-container">
            <div className="header">
              <h2>Map</h2>
              <div>
                <input
                  type="text"
                  className="searchbar"
                  placeholder="Search"
                  onChange={(e) => handleSearchChange(e)}
                />
              </div>
            </div>

            <MapContainer
              attributionControl={false}
              center={defaultLocation()}
              zoom={2.5}
              scrollWheelZoom={true}
              zoomControl={false}
            >
              <TileLayer
                attribution=' <a href="https://www.openstreetmap.org/copyright"></a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZoomControl position="topright" />

              {asset && (
                <SetViewOnClick
                  location={[
                    asset?.locations[0].latitude,
                    asset?.locations[0].longitude,
                  ]}
                />
              )}

              {!asset && <RenderLoaction locationData={currentLocationAsset} />}

              <PolylineWithMarker asset={asset} showCurrent={false} />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
