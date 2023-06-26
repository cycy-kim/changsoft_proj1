import React, { useState } from "react";
import {
  TileLayout,
  TileLayoutRepositionEvent,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import TotalProject from "./../component/homeComponent/projectIntro";
import ProjectDetail from "./../component/homeComponent/projectDetail";
import DistributionMap from "./../component/homeComponent/distributionMap";
import UsagePercentage from "./../component/homeComponent/usagePercentage";
import CompanyPercentage from "../component/homeComponent/companyPercantage";
import LocalPercentage from "../component/homeComponent/localPercentage";
import TotalArea from "../component/homeComponent/totalArea";
import FloorCount from "../component/homeComponent/floorCount";


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
    header: "Location Map",
    body: <DistributionMap />,
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
    header: "Building Floors",
    body: <FloorCount />,
  },
  {
    header: "Empty",
    body: <Button></Button>,
  },
  {
    header: "Project Total Area",
    body: <TotalArea />,
  },
];

export const Home: React.FC = () => {
  const [data, setData] = useState<
    { col: number; colSpan: number; rowSpan: number }[]
  >([
    { col: 1, colSpan: 1, rowSpan: 1 }, // Total project
    { col: 1, colSpan: 1, rowSpan: 1 }, // Total Building
    { col: 2, colSpan: 3, rowSpan: 2 }, // Map
    { col: 1, colSpan: 2, rowSpan: 2 }, // Local %
    { col: 3, colSpan: 2, rowSpan: 2 }, // Company %
    { col: 1, colSpan: 2, rowSpan: 2 }, // Usage %
    { col: 3, colSpan: 1, rowSpan: 2 }, // Floor Count
    { col: 4, colSpan: 1, rowSpan: 2 }, // Button
    { col: 1, colSpan: 4, rowSpan: 2 }, // Total Area
  ]);

  const handleReposition = (e: TileLayoutRepositionEvent) => {
    setData(e.value);
    console.log(e.value);
  };

  return (
    <div className="building-dashboard-container">
      <TileLayout
        columns={4}
        rowHeight={250}
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
