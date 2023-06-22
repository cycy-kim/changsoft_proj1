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

const TotalArea = () => {
    const [totalarea, setTotalarea] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            
            const response = await axios.get(urlPrefix.IP_port + "/dashboard/project");
            const data = response.data;
            setTotalarea(data);
            
            console.log(data)
            setTotalarea(data);
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
