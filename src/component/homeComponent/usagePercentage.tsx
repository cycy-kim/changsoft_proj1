import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
} from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
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

const labelContent = (e: any) =>
  e.category + "(" + (Number(e.percentage) * 100).toFixed(2) + "%)";

const test_data_percentage = [
  { sub_building_type: "type1", count: 150 ,percentage : 0.1},
  { sub_building_type: "type2", count: 100 ,percentage : 0.25},
  { sub_building_type: "type3", count: 80 ,percentage : 0.15},
  { sub_building_type: "type4", count: 200 ,percentage : 0.3},
  { sub_building_type: "type5", count: 300 ,percentage : 0.2},
];

const UsagePercentage = () => {
  const [percentages, setPercentages] = useState<percent_percentage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(urlPrefix.IP_port + "/dashboard/project");
        const data = response.data;
        setPercentages(data);
        
        console.log(data)
        setPercentages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart>
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={percentages}
            categoryField="sub_building_type"
            field="COUNT"
            autoFit = {true}
            holeSize = {100}
          >
            <ChartSeriesLabels
              color="#000"
              background="none"
              position="outsideEnd"
              content={labelContent}
            />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartLegend visible={false} />
      </Chart>
    </div>
  );
};

export default UsagePercentage;
