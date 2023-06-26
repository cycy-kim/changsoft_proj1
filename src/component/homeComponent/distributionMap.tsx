import React, {
  useState,
  useEffect,
} from "react";
import {
  Map,
  TileUrlTemplateArgs,
  MapLayers,
  MapBubbleLayer,
  MapShapeLayer,
  MapTileLayer,
  MapMarkerLayer,
} from "@progress/kendo-react-map";
import urlPrefix from "../../resource/URL_prefix.json";
import { location } from "../../interface/location";
import { coordinate } from "../../interface/coordinate";
import axios from "axios";
import GoogleMap_API_KEY from "./../../resource/googleMap_API_KEY.json"

const tileSubdomains = ["a", "b", "c"];
const tileUrl = (e: TileUrlTemplateArgs) =>
`https://${e.subdomain}.tile.openstreetmap.org/${e.zoom}/${e.x}/${e.y}.png?layers=T`;
const attribution =
  '&copy; <a href="https://osm.org/copyright">OpenStreetMap contributors</a>';

const reqPrefix = "https://maps.googleapis.com/maps/api/geocode/json?address="
let address = "";
const reqPostfix = "&key=" + GoogleMap_API_KEY

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
const markerStyle = {
  fill: {
    color: "#fff",
    opacity: 0.5,
  },
  stroke: {
    width: 3,
    color: "#bbb",
  },
};

const test_data_marker : coordinate[]=[
  {
    latlng: [37.4950413, 127.1580819],
    name: "data1",
    numOfBuildings: 0.8,
  },
  {
    latlng: [37.6600137, 127.0762614],
    name: "data2",
    numOfBuildings: 1,
  },
  {
    latlng: [35.3, 129],
    name: "data3",
    numOfBuildings: 2,
  },
];

const DistributionMap = () => {
  const [markers, setMarkers] = useState<coordinate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("!")
        const response = await axios.get(urlPrefix.IP_port + "/dashboard/project/map");
        const data:coordinate[] = response.data;
        console.log("?")
        
        setMarkers(data);
        console.log(markers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });

  return (
    <div>
      <Map center={[36, 128]} zoom={7}>
        <MapLayers>
          <MapTileLayer
            urlTemplate={tileUrl}
            subdomains={tileSubdomains}
            attribution={attribution}
          />
          <MapShapeLayer data={geoShapes} style={markerStyle} />

          <MapBubbleLayer
            data={markers}
            locationField="latlng"
            //size is determined by ratio of numOfBuildings 
            valueField="numOfBuildings"
            attribution="Population data from Nordpil and UN Population Division."
            style={markerStyle}
          />

          {/* <MapMarkerLayer
            data={markers}
            locationField="latlng"
            titleField="name"
          /> */}
        </MapLayers>
      </Map>
    </div>
  );
};

export default DistributionMap;
