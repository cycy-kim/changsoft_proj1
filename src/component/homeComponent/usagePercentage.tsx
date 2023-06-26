import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
} from "react";
import {
  Chart,
  ChartLegend,
  ChartTooltip,
  ChartSeries,
  ChartSeriesItem,
  ChartLegendTitle,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import {
  setExpandedState,
  setGroupIds,
} from "@progress/kendo-react-data-tools";
import "hammerjs";
import axios from "axios";
import { percent_percentage } from "../../interface/percentage_interface";
import urlPrefix from "./../../resource/URL_prefix.json";
import "./../../styles/ChartFont.scss";

const labelContent = (e: any) =>
  e.category + "(" + (Number(e.percentage) * 100).toFixed(2) + "%)";

const test_data_percentage = [
  { field: "type1", count: 150, percentage: 0.1 },
  { field: "type2", count: 100, percentage: 0.25 },
  { field: "type3", count: 80, percentage: 0.15 },
  { field: "type4", count: 200, percentage: 0.3 },
  { field: "type5", count: 300, percentage: 0.2 },
];

const UsagePercentage = () => {
  const [percentages, setPercentages] = useState<percent_percentage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/dashboard/project/usage_ratio"
        );
        const data = JSON.parse(response.data);
        setPercentages(data);

        //setPercentages(test_data_percentage);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderTooltip = (e: any) => {
    if (e && e.point) {
      if (e.point.category === null) {
        return (
          <div>
            <p>Category: NULL </p>
            <p>Percentage: {Number(e.point.dataItem.percentage).toFixed(2)}%</p>
          </div>
        );
      }
      return (
        <div>
          <p>Category: {e.point.category}</p>
          <p>Percentage: {Number(e.point.dataItem.percentage).toFixed(2)}%</p>
        </div>
      );
    }
  };

  return (
    <div>
      <Chart>
        <ChartLegend position="top">
          <ChartLegendTitle text="Usages" font="20px" />
        </ChartLegend>

        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={percentages}
            categoryField="field"
            field="percentage"
            autoFit={true}
            holeSize={100}
          ></ChartSeriesItem>
        </ChartSeries>
        <ChartTooltip render={renderTooltip} />
      </Chart>
    </div>
  );
};

export default UsagePercentage;
