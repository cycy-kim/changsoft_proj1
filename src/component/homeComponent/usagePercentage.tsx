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
import { usagePercent_interface } from "../../interface/usagePercent_interface";
import urlPrefix from "./../../resource/URL_prefix.json";

const labelContent = (e: any) =>
  e.category + "(" + (Number(e.percentage) * 100).toFixed(2) + "%)";

const test_data_percentage = [
  { sub_building_type: "type1", count: 150 },
  { sub_building_type: "type2", count: 100 },
  { sub_building_type: "type3", count: 80 },
  { sub_building_type: "type4", count: 200 },
  { sub_building_type: "type5", count: 300 },
];

const UsagePercentage = () => {
  const [percentages, setPercentages] = useState<usagePercent_interface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(urlPrefix.IP_port + "/dashboard/project");
        const data1 = response.data;
        setPercentages(data1);
        
        console.log(data1)
        setPercentages(test_data_percentage);
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
