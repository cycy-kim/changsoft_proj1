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
    header: "Distribution Map",
    body: <DistributionMap />,
  },
  {
    header: "Local Percentage",
    body: <LocalPercentage />,
  },
  {
    header: "Company Percentage",
    body: <CompanyPercentage />,
  },
  {
    header: "Usage Percentage",
    body: <UsagePercentage />,
  },
  {
    header: "Total Area",
    body: <TotalArea />,
  },
];

export const Home: React.FC = () => {
  const [data, setData] = useState<
    { col: number; colSpan: number; rowSpan: number }[]
  >([
    { col: 1, colSpan: 1, rowSpan: 1 }, // Total project
    { col: 1, colSpan: 1, rowSpan: 1 }, // Total Building
    { col: 2, colSpan: 2, rowSpan: 2 }, // Map
    { col: 4, colSpan: 1, rowSpan: 2 }, // Local %
    { col: 1, colSpan: 1, rowSpan: 2 }, // 
    { col: 2, colSpan: 1, rowSpan: 2 }, // 
    { col: 3, colSpan: 2, rowSpan: 2 }, // 
  ]);

  const handleReposition = (e: TileLayoutRepositionEvent) => {
    setData(e.value);
    console.log(e.value);
  };

  return (
    <div className="building-dashboard-container">
      <TileLayout
        columns={4}
        rowHeight={255}
        positions={data}
        gap={{ rows: 10, columns: 10 }}
        items={tiles.map((tile, index) => ({
          ...tile,
          reorderable: tile.header !== "Distribution Map", // Set reorderable to false for Distribution Map tile
        }))}
        onReposition={handleReposition}
      />
    </div>
  );
};
