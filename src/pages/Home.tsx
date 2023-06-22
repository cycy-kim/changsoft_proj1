import React from "react";
import { TileLayout } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import TotalProject from "./../component/homeComponent/projectIntro";

import ProjectDetail from "./../component/homeComponent/projectDetail";
import DistributionMap from "./../component/homeComponent/distributionMap";
import UsagePercentage from "./../component/homeComponent/usagePercentage";

interface Tile {
  defaultPosition: {
    col: number;
    colSpan: number;
    rowSpan: number;
  };
  header: string;
  body: React.ReactNode;
  reorderable?: boolean;
  draggable?: boolean;
}

const tiles= [
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Total Projects",
    body: <TotalProject />,
  },
  {
    defaultPosition: {
      col: 2,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Total Buildings",
    body: <ProjectDetail />,
  },
  {
    defaultPosition: {
      col: 3,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Distribution Map",
    body: <DistributionMap />,
    reorderable: false,
  },
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Tile 4",
    body: <UsagePercentage />,
  },
  {
    defaultPosition: {
      col: 2,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Tile 5",
    body: <Button>Button 5</Button>,
  },
  {
    defaultPosition: {
      col: 3,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Tile 6",
    body: <Button>Button 6</Button>,
  },
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Tile 7",
    body: <Button>Button 7</Button>,
  },
  {
    defaultPosition: {
      col: 2,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Tile 8",
    body: <Button>Button 8</Button>,
  },
  {
    defaultPosition: {
      col: 3,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Tile 9",
    body: <Button>Button 9</Button>,
  },
];

export const Home: React.FC = () => {
  return (
    <div className="building-dashboard-container">
      <TileLayout columns={3} items={tiles} />
    </div>
  );
};