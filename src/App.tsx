import "./App.css";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useMemo, useState } from "react";
import RenderLoaction from "./RenderLoaction";
import PolylineWithMarker from "./PolylineWithMarker";
import { LatLngTuple } from "leaflet";
import MapBound from "./MapBound";
import AssetListing from "./AssetListing";
import { faker } from "@faker-js/faker";

function SetViewOnClick({ bound }: any) {
  const map = useMap();
  map.flyToBounds(bound, { paddingTopLeft: [340, 50] });

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

const handleListing = () => {
  return {
    assetId: faker.string.uuid(),
    assetName: faker.commerce.productName(),
    companyName: faker.company.name(),
    companyLogo: faker.image.avatar(),
    locations: [
      {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        createDate: faker.git.commitDate(),
      },
      {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        createDate: faker.git.commitDate(),
      },
      {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        createDate: faker.git.commitDate(),
      },
    ],
  };
};

const handleCount = (count: number, handleListing: any) => {
  let dataArray = [];

  for (let i = 0; i < count; i++) {
    dataArray.push({ ...handleListing() });
  }
  return dataArray;
};

function App() {
  const [currentLocationAsset, setCurrentLocationAsset] = useState<
    null | AssetTypes[]
  >();
  const [asset, setAsset] = useState<null | AssetTypes>();

  const [data, setData] = useState<AssetTypes[]>([]);

  //All data
  // const responseData = data1.data;

  useEffect(() => {
    let datasArr = handleCount(10, handleListing);
    setData(datasArr);
  }, []);

  console.log("data", data);

  const extractBounds = useMemo<LatLngTuple[]>(() => {
    const bounds = data.reduce((prev, nxt) => {
      const extractedlatLong: LatLngTuple[] = nxt.locations.map((loc) => [
        loc.latitude,
        loc.longitude,
      ]);

      return [...prev, ...extractedlatLong];
    }, [] as LatLngTuple[]);

    return bounds;
  }, [data]);

  //Active toggle class function
  const toggleClass = (e: any) => {
    //store deviceName
    const deviceResponse = parseInt(e.target.id);

    if (deviceResponse === asset?.assetId) {
      setAsset(null);
    } else {
      //looking for device name from list
      let assetName = data?.find((id) => id.assetId === deviceResponse);

      //set selected device object
      setAsset(assetName);
    }
  };

  useEffect(() => {
    const assetsWithCurrentLoactions = data.map((asset) => ({
      ...asset,
      locations: [
        {
          latitude: asset.locations[0].latitude,
          longitude: asset.locations[0].longitude,
        },
      ],
    }));

    setCurrentLocationAsset([...assetsWithCurrentLoactions]);
  }, [data]);

  //Function for search bar
  const handleSearchChange = (e: any) => {
    console.log(e.currentTarget.value);
  };

  return (
    <>
      <div className="container">
        <div className="mapBox">
          <div className="left-container">
            <AssetListing
              asset={asset}
              responseData={data}
              toggleClass={toggleClass}
            />
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
              zoom={5.5}
              scrollWheelZoom={true}
              zoomControl={false}
            >
              <MapBound bound={extractBounds} />

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
                  bound={asset.locations.map((location) => {
                    return [location.latitude, location.longitude];
                  })}
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
