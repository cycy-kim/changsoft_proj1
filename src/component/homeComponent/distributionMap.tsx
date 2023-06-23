import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
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

//const req_url = `https://nominatim.openstreetmap.org/search?format=json&q=`;
/*
const tileSubdomains = ["a", "b", "c"];
const tileUrl = (e: TileUrlTemplateArgs) =>
`https://${e.subdomain}.tile.openstreetmap.org/${e.zoom}/${e.x}/${e.y}.png?layers=T`;
const attribution =
  '&copy; <a href="https://osm.org/copyright">OpenStreetMap contributors</a>';
*/
const tileSubdomains = ["a", "b", "c"];
const tileUrl = (e: TileUrlTemplateArgs) =>
`https://${e.subdomain}.tile.openstreetmap.org/${e.zoom}/${e.x}/${e.y}.png?layers=T`;


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
        //여러개일때 axios.all사용해야함
        //db에 데이터 들어오면 수정해보기
        
        console.log("!")
        const response = await axios.get(urlPrefix.IP_port + "/project_location");
        const data: coordinate[] = response.data;
        console.log("?")
        console.log(data);
        
        setMarkers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Map center={[36.5, 127.7]} zoom={7}>
        <MapLayers>
          <MapTileLayer
            urlTemplate={tileUrl}
            subdomains={tileSubdomains}
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
