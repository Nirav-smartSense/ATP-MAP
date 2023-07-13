import React, { useCallback, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { AssetTypes } from "./App";

const AssetListing = ({ responseData, asset, toggleClass, loadMore }: any) => {
  console.log("assetData", responseData);

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
        components={{ Footer }}
      />
    </div>
  );
};

const Footer = () => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      Loading...
    </div>
  );
};

export default AssetListing;
