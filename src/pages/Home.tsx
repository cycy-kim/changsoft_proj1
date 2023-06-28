import React, { useState } from "react";
import {
  TileLayout,
  TileLayoutRepositionEvent,
} from "@progress/kendo-react-layout";
import TotalProject from "./../component/homeComponent/totalProjectNum";
import ProjectDetail from "./../component/homeComponent/totalBuildingNum";
import DistributionMap from "./../component/homeComponent/distributionMap";
import UsagePercentage from "./../component/homeComponent/usagePercentage";
import CompanyPercentage from "../component/homeComponent/companyPercantage";
import LocalPercentage from "../component/homeComponent/localPercentage";
import TotalArea from "../component/homeComponent/totalArea";
import FloorCount from "../component/homeComponent/floorCount";
// import { TotalAreaByCompany } from "../component/homeComponent/totalAreaByCompany";
import { Button } from "@progress/kendo-react-buttons";


interface Tile {
  header: string;
  body: React.ReactNode;
}

const tiles: Tile[] = [
  {
    header: "Total Projects",
    body: <TotalProject />,
  },
  {
    header: "Total Buildings",
    body: <ProjectDetail />,
  },
  {
    header: "Locations",
    body: <LocalPercentage />,
  },
  {
    header: "Companies",
    body: <CompanyPercentage />,
  },
  {
    header: "Usages",
    body: <UsagePercentage />,
  },
  {
    header: "Project Total Area",
    body: <TotalArea />,
  },
  {
    header: "Building Floors",
    body: <FloorCount />,
  },
  {
    header: "Location Map",
    body: <DistributionMap />,
  },
  {
    header: "Total Area by Company",
    body: <></> //<TotalAreaByCompany />,
  },
];

export const Home: React.FC = () => {
  const [data, setData] = useState<
    { col: number; colSpan: number; rowSpan: number }[]
  >([
    { col: 1, colSpan: 1, rowSpan: 1 }, // Total project
    { col: 1, colSpan: 1, rowSpan: 1 }, // Total Building
    { col: 2, colSpan: 2, rowSpan: 2 }, // Local %
    { col: 4, colSpan: 2, rowSpan: 2 }, // Company %
    { col: 6, colSpan: 2, rowSpan: 2 }, // Usage %
    { col: 1, colSpan: 3, rowSpan: 2 }, // Total Area
    { col: 4, colSpan: 2, rowSpan: 2 }, // Floor Count
    { col: 6, colSpan: 2, rowSpan: 2 }, // Map
    { col: 1, colSpan: 7, rowSpan: 2 }, // Total Area by Company
  ]);

  const handleReposition = (e: TileLayoutRepositionEvent) => {
    setData(e.value);
    console.log(e.value);
  };

  return (
    <div className="building-dashboard-container">
      <TileLayout
        columns={7}
        rowHeight={"21vh"}
        positions={data}
        gap={{ rows: 10, columns: 10 }}
        items={tiles.map((tile, index) => ({
          ...tile,
          reorderable: false,
          header: <strong>{tile.header}</strong>,
          body: <div className="tile-content">{tile.body}</div>,
        }))}
        onReposition={handleReposition}
      />
    </div>
  );
};
