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

const labelContent = (e:any) => e.category;

const UsagePercentage = () => {
  const [percentages, setPercentages] = useState<usagePercent_interface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("");
        const data1 = response.data;
        setPercentages(data1);
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
          >
            <ChartSeriesLabels
              color="#fff"
              background="none"
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
