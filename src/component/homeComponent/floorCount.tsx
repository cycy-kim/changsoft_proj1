import React, {
  useState,
  useEffect,
} from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisTitle,
  ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import "hammerjs";
import axios from "axios";
import urlPrefix from "./../../resource/URL_prefix.json";

interface projectsFloorCount {
  range_num: number;
  item_count: number;
}

const FloorCount = () => {
  const [totalfloor, setTotalfloor] = useState<projectsFloorCount[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/dashboard/building/floor_count_histogram"
        );
        const data = JSON.parse(response.data);

        setTotalfloor(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (<div>
     <Chart>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={totalfloor.map((obj)=> obj.range_num*10)}
          >
            <ChartCategoryAxisTitle text="Floor" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>

        <ChartSeries>
          <ChartSeriesItem
            type="column"
            gap={2}
            spacing={0.25}
            data={totalfloor.map((obj) => obj.item_count)}
            color="#00028f">
            </ChartSeriesItem>
        </ChartSeries>
      </Chart>
  </div>);
};

export default FloorCount;
