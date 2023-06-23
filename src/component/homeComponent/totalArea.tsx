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

const testData: projectsTotalArea[] = [
  {
    project_name: "계룡_대전 용전근린공원 공동주택 신축공사",
    total_area: 14,
  },
  {
    project_name: "신세계_어바인시티",
    total_area: 13,
  },
  {
    project_name: "화성 송산그린시티 EB2 도시형생활주택 신축공사",
    total_area: 10,
  },
];

const TotalArea = () => {
  const [totalarea, setTotalarea] = useState<projectsTotalArea[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/project/total_area,project_name"
        );
        const data = response.data;

        //데이터데이스 업뎃되면 ㄹㅇ데이터로 바꿔야함
        setTotalarea(testData);
        //setTotalarea(data);
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
            categories={totalarea.map((obj) => obj.project_name)}
          >
            <ChartCategoryAxisTitle text="Projects" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>

        <ChartSeries>
          <ChartSeriesItem
            type="column"
            gap={2}
            spacing={0.25}
            data={totalarea.map((obj) => obj.total_area)}
            color="#00028f" // 원하는 색상으로 수정하세요
          />
        </ChartSeries>
      </Chart>
    </div>
  );
};

export default TotalArea;
