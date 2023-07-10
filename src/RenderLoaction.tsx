import { AssetTypes } from './App';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { v4 as uuidv4 } from 'uuid';

import CustomMarker from './CustomMarker';

const RenderLoaction = ({
  locationData,
}: {
  locationData: AssetTypes[] | null | undefined;
}) => {
  if (!locationData) {
    return null;
  }

  return (
    <MarkerClusterGroup>
      {locationData.map(({ companyName, locations }) => {
        return locations.map(({ latitude, longitude, createDate }) => (
          <CustomMarker
            position={[latitude, longitude]}
            createDate={createDate}
            companyName={companyName}
            key={uuidv4()}
          />
        ));
      })}
    </MarkerClusterGroup>
  );
};

export default RenderLoaction;
