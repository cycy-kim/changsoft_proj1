import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
} from "react";
import {
  filterBy,
  CompositeFilterDescriptor,
  GroupDescriptor,
  groupBy,
  GroupResult,
  State,
  DataResult,
  process,
  AggregateDescriptor,
} from "@progress/kendo-data-query";
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

const labelContent = (e: any) =>
  e.category + "(" + (Number(e.percentage) * 100).toFixed(2) + "%)";

const test_data_percentage = [
  { sub_building_type: "type1", COUNT: 150 },
  { sub_building_type: "type2", COUNT: 100 },
  { sub_building_type: "type3", COUNT: 80 },
  { sub_building_type: "type4", COUNT: 200 },
  { sub_building_type: "type5", COUNT: 300 },
];

const UsagePercentage = () => {
  const [percentages, setPercentages] = useState<usagePercent_interface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*
        const response = await axios.get("");
        const data1 = response.data;
        setPercentages(data1);
        */

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
