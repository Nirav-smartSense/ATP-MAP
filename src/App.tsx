import "./App.css";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIcon from "../public/marker-icon.png";
import { useEffect, useState } from "react";
import data from "./data.json";

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

type AssetTypes = {
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
  const [currentLocationAsset, setCurrentLocationAsset] =
    useState<null | AssetLocation>();
  const [asset, setAsset] = useState<null | AssetTypes>();
  const [assets, setAssets] = useState(data.data);
  const [isPolyLine, setIsPolyLine] = useState(false);

  useEffect(() => {
    console.log("asset2", asset);
  }, [asset]);

  useEffect(() => {
    console.log("currentLocationAsset", currentLocationAsset);
  }, [currentLocationAsset]);

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
  const limeOptions = { color: "black" };

  //custom icons
  const customIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [20, 30],
  });

  //Active toggle class function
  const toggleClass = (e: any) => {
    //store deviceName
    const deviceResponse = e.target.id;

    //Check If all device not selected
    if (deviceResponse !== "showAll") {
      setIsShowAll(false);
      setActive(deviceResponse);
      setIsPolyLine(true);

      //looking for device name from list
      let assetName = responseData?.find(
        (id) => id.assetName === deviceResponse
      );

      //set selected device object
      setAsset(assetName);

      //re assign list with new asset
      assetName && setAssets([assetName]);
    } else {
      if (showCurrentLocation) {
        console.log("current yes");
        setIsShowAll(true);
      } else {
        setAssets(data.data);
        setIsShowAll(true);
        setIsPolyLine(false);
      }
    }
  };

  //Function for current location
  const handleCurrentLocation = () => {
    setShowCurrentLocation(!showCurrentLocation);

    if (!showCurrentLocation) {
      //Check show all device
      if (isShowAll) {
        const currentAllLocation = assets.map((data) => {
          return {
            ...data,
            locations: [
              {
                latitude: data.locations[0].latitude,
                longitude: data.locations[0].longitude,
                createDate: data.locations[0].createDate,
              },
            ],
          };
        });

        //re assign current location list with selected device
        setAssets(currentAllLocation);
      } else {
        const locations = [
          {
            latitude: asset?.locations[0].latitude,
            longitude: asset?.locations[0].longitude,
          },
        ];

        console.log("deviceLoc", locations);
        const assetLocation = { ...asset, locations };
        console.log("assetLoction", assetLocation);
        setAsset(assetLocation);
      }
    } else {
      setAssets(data.data);
    }
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
              <li>
                <a
                  id="showAll"
                  onClick={(e) => toggleClass(e)}
                  className={
                    isShowAll
                      ? "active"
                      : isActive === "showAll"
                      ? "active"
                      : ""
                  }
                >
                  Show All
                </a>
              </li>

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
                  value="Bike"
                  onChange={handleCurrentLocation}
                ></input>
                <label htmlFor="currentLocation">Show Current</label>
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

              {assets.map((asset, key) => {
                return asset.locations.map((locationData) => {
                  return (
                    <>
                      <Marker
                        position={[
                          locationData.latitude,
                          locationData.longitude,
                        ]}
                        icon={customIcon}
                      >
                        <Tooltip permanent direction="top">
                          <div className="popUpMarker">
                            <img src={markerIcon} height={20} alt="" />
                            <p>{asset.companyName}</p>
                          </div>
                        </Tooltip>
                      </Marker>
                    </>
                  );
                });
              })}

              {isPolyLine ? (
                <Polyline
                  pathOptions={limeOptions}
                  positions={asset?.locations.map((data) => {
                    return [data.latitude, data.longitude];
                  })}
                />
              ) : (
                ""
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
