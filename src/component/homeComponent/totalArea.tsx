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
import urlPrefix from "./../../resource/URL_prefix.json";

const TotalArea = () => {
    const [totalarea, setTotalarea] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(urlPrefix.IP_port + "/project/project_name,total_area");
            const data = response.data;
            console.log(data)
            //setTotalarea(data);
            
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);


      return (<div>
        {totalarea}
      </div>)
};

export default TotalArea;
