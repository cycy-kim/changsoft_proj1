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
    header: "Usage Percentage",
    body: <UsagePercentage />,
  },
];

export const Home: React.FC = () => {
  const [data, setData] = useState<
    { col: number; colSpan: number; rowSpan: number }[]
  >([
    { col: 1, colSpan: 1, rowSpan: 1 },
    { col: 1, colSpan: 1, rowSpan: 1 },
    { col: 2, colSpan: 3, rowSpan: 2 },
    { col: 2, colSpan: 3, rowSpan: 2 },
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
          reorderable: index !== 2, // Set reorderable to false for Distribution Map tile
        }))}
        onReposition={handleReposition}
      />
    </div>
  );
};
