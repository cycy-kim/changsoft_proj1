import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
} from "react";
import {
  filterBy,
  CompositeFilterDescriptor,
  GroupDescriptor,
  groupBy,
  GroupResult,
  State,
  DataResult,
  process,
  AggregateDescriptor,
} from "@progress/kendo-data-query";
import {
  setExpandedState,
  setGroupIds,
} from "@progress/kendo-react-data-tools";
import axios from "axios";
import {
  Map,
  TileUrlTemplateArgs,
  MapLayers,
  MapShapeLayer,
  MapTileLayer,
  MapMarkerLayer,
} from "@progress/kendo-react-map";

const tileSubdomains = ["a", "b", "c"];
const tileUrl = (e: TileUrlTemplateArgs) =>
  `https://${e.subdomain}.tile.openstreetmap.org/${e.zoom}/${e.x}/${e.y}.png`;
const attribution =
  '&copy; <a href="https://osm.org/copyright">OpenStreetMap contributors</a>';

  
const geoShapes = [
    {
      type: "Polygon",
      coordinates: [
        // Note that GeoJSON coordinates are listed as Longitude, Latitude (X, Y).
        // Map locations are typically listed as Latitude, Longitude as in the other Map properties.
        [
          [-97.7409, 30.2675],
          [-97.7409, 30.2705],
          [-97.749, 30.2707],
          [-97.7494, 30.2686],
          [-97.7409, 30.2675],
        ],
      ],
    },
  ];
  const shapeStyle = {
    fill: {
      color: "#fff",
      opacity: 0.5,
    },
    stroke: {
      width: 3,
      color: "#bbb",
    },
  };
  
  const markers = [
    { latlng: [35.16654,129.08537], name: "Busan" },
    { latlng: [37.53005,126.98215], name: "Seoul" },
    /*
    { latlng: [36.5, 127.7], name: "Mainway Toys" },
    { latlng: [36.5, 127.7], name: "Acme Toys" },
    */
  ];


const DistributionMap = () => {
  return (
    <div>
      <Map center={[36.5, 127.7]} zoom={7}>
        <MapLayers>
          <MapTileLayer
            urlTemplate={tileUrl}
            subdomains={tileSubdomains}
            attribution={attribution}
          />
          <MapShapeLayer data={geoShapes} style={shapeStyle} />
          <MapMarkerLayer
            data={markers}
            locationField="latlng"
            titleField="name"
          />
        </MapLayers>
      </Map>
    </div>
  );
};

export default DistributionMap;
