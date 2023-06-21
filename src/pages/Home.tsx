import React from 'react';
import { TileLayout } from "@progress/kendo-react-layout";
import { Button } from '@progress/kendo-react-buttons';
import ProjectIntro from '../component/homeComponent/projectIntro';
import ProjectDetail from '../component/homeComponent/projectDetail';
import DistributionMap from '../component/homeComponent/distributionMap';

const tiles = [
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Number of total projects",
    body: <ProjectIntro></ProjectIntro>,
  },
  {
    defaultPosition: {
      col: 2,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Tile 2",
    body: <ProjectDetail></ProjectDetail>,
  },
  {
    defaultPosition: {
      col: 3,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Tile 3",
    body: <Button>Button 3</Button>,
  },
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Tile 4",
    body: <Button>Button 4</Button>,
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
    header: "Distribution Map",
    body: <DistributionMap></DistributionMap>,
  },
];

export const Home: React.FC = () => {
  return (
    <div className="building-dashboard-container">
      <TileLayout columns={3} items={tiles}></TileLayout>
    </div>
  );
};
