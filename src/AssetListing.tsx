import React, { useCallback, useEffect } from "react";
import { Virtuoso } from "react-virtuoso";
import { AssetTypes } from "./App";

const AssetListing = ({ responseData, asset, toggleClass }: any) => {
  const loadMore = useCallback(() => {
    return setTimeout(() => {}, 200);
  }, []);

  useEffect(() => {
    const timeout = loadMore();
    return () => clearTimeout(timeout);
  }, []);

  const handleListItems = (index: number) => {
    const ast = responseData[index];

    return (
      <div className="listItem" key={ast.assetId}>
        <a
          id={`${ast.assetId}`}
          onClick={(e) => toggleClass(e)}
          className={ast.assetId === asset?.assetId ? "active" : ""}
        >
          {ast.assetName}
        </a>
      </div>
    );
  };

  return (
    <div>
      <h2>Assets</h2>
      <Virtuoso
        style={{ height: "calc(100vh - 200px)" }}
        data={responseData}
        itemContent={handleListItems}
        endReached={loadMore}
      />
    </div>
  );
};

export default AssetListing;
