import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
} from "react";
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisTitle,
    ChartCategoryAxisItem,
  } from "@progress/kendo-react-charts";
import {
  setExpandedState,
  setGroupIds,
} from "@progress/kendo-react-data-tools";
import "hammerjs";
import axios from "axios";
import urlPrefix from "./../../resource/URL_prefix.json";


interface projectsTotalArea {
  project_name: string;
  total_area: number;
}


const TotalArea = () => {
  const [totalarea, setTotalarea] = useState<projectsTotalArea[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/project/total_area,project_name"
        );
        const data = response.data;
        console.log(data);
        setTotalarea(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart>
        <ChartTitle/>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={totalarea}>
            <ChartCategoryAxisTitle text="Projects" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem
            type="column"
            gap={2}
            spacing={0.25}
            data={totalarea}
          />
          <ChartSeriesItem type="bar" data={totalarea} />
          <ChartSeriesItem type="bar" data={totalarea} />
          <ChartSeriesItem type="bar" data={totalarea} />
        </ChartSeries>
      </Chart>
    </div>
  );
};

export default TotalArea;
