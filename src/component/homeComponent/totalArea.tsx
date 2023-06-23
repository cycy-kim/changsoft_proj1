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
  ChartArea,
  ChartSeriesItemTooltip,
} from "@progress/kendo-react-charts";
import {
  setExpandedState,
  setGroupIds,
} from "@progress/kendo-react-data-tools";
import "hammerjs";
import axios from "axios";
import urlPrefix from "./../../resource/URL_prefix.json";

interface projectsTotalArea {
  min_val : number;
  max_val : number;
  range_num: number;
  item_count: number;
}

const categoryContent = (e:any)=>{
  return  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".concat(Math.floor(((e.max_val - e.min_val)/ 8 ) * e.range_num).toString())
}
const testData: projectsTotalArea[] = [
  {
    min_val : 1,
  max_val : 2,
  range_num: 3,
  item_count: 4
  },
  {
    min_val : 1,
  max_val : 2,
  range_num: 3,
  item_count: 4
  },
  {
    min_val : 1,
  max_val : 2,
  range_num: 3,
  item_count: 4
  },
];

const TotalArea = () => {
  const [totalarea, setTotalarea] = useState<projectsTotalArea[]>([]);
  const [maxRng,setMaxRng] =useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/dashboard/project/total_area_histogram"
        );
        const data = JSON.parse(response.data);
          
        setTotalarea(data);
        setMaxRng(data[0].max_val)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={(totalarea.map(categoryContent)).concat("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".concat(maxRng.toString()))}
          >
            <ChartCategoryAxisTitle text="Area" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>

        <ChartSeries>
          <ChartSeriesItem
            type="column"
            gap={2}
            spacing={0.25}
            data={totalarea.map((obj) => obj.item_count)}
            color="#00028f">
            </ChartSeriesItem>
        </ChartSeries>
      </Chart>
    </div>
  );
};

export default TotalArea;
