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
  const [isActive, setActive] = useState("all");
  const [isShowAll, setIsShowAll] = useState(true);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [currentLocationAsset, setCurrentLocationAsset] = useState<
    null | AssetTypes[]
  >();
  const [asset, setAsset] = useState<null | AssetTypes>();
  const [showAllAssets, setShowAllAssets] = useState(data.data);

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

  //Location line color

  //custom icons

  //Active toggle class function
  const toggleClass = (e: any) => {
    //store deviceName
    const deviceResponse = e.target.id;

    //Check If all device not selected
    setIsShowAll(false);
    setActive(deviceResponse);

    //looking for device name from list
    let assetName = responseData?.find((id) => id.assetName === deviceResponse);

    //set selected device object
    setAsset(assetName);
  };

  //Function for current location
  const handleCurrentLocation = () => {
    setShowCurrentLocation((prev) => !prev);
  };

  useEffect(() => {
    if (asset) {
      setCurrentLocationAsset([
        {
          ...asset,
          locations: [
            {
              latitude: asset.locations[0].latitude,
              longitude: asset.locations[0].longitude,
            },
          ],
        },
      ]);
    }

    if (isShowAll) {
      const assetsWithCurrentLoactions = showAllAssets.map((asset) => ({
        ...asset,
        locations: [
          {
            latitude: asset.locations[0].latitude,
            longitude: asset.locations[0].longitude,
          },
        ],
      }));

      setCurrentLocationAsset([...assetsWithCurrentLoactions]);
    }
  }, [isShowAll, showCurrentLocation, asset]);

  const handleShowAllToggle = () => {
    setIsShowAll((prev) => !prev);
    setAsset(null);
  };

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
              {responseData.map((asset, key) => {
                return (
                  <>
                    <li key={asset.assetId}>
                      <a
                        id={asset.assetName}
                        className={
                          isShowAll
                            ? "active"
                            : isActive === asset.assetName
                            ? "active"
                            : ""
                        }
                        onClick={(e) => toggleClass(e)}
                      >
                        {asset.assetName}
                      </a>
                    </li>
                  </>
                );
              })}

              <li>
                <input
                  type="checkbox"
                  id="currentLocation"
                  name="currentLocation"
                  checked={showCurrentLocation}
                  onChange={handleCurrentLocation}
                ></input>
                <label htmlFor="currentLocation">Show Current</label>
              </li>

              <li>
                <input
                  type="checkbox"
                  id="showAll"
                  name="showAll"
                  checked={isShowAll}
                  onChange={handleShowAllToggle}
                ></input>
                <label htmlFor="showAll">Show all</label>
              </li>
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
              zoom={7}
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

              {isShowAll && !showCurrentLocation && (
                <RenderLoaction locationData={showAllAssets} />
              )}

              {showCurrentLocation && isShowAll && (
                <RenderLoaction locationData={currentLocationAsset} />
              )}

              <PolylineWithMarker
                asset={asset}
                showCurrent={showCurrentLocation}
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
