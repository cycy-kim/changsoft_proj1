import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTooltip,
} from "@progress/kendo-react-charts";
import urlPrefix from "./../../resource/URL_prefix.json";
import "./../../styles/ChartFont.scss";

const LocalPercentage = () => {
  const [percentages, setPercentages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/dashboard/project/location_ratio"
        );
        const data = JSON.parse(response.data);
        setPercentages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderTooltip = (e: any) => {
    if (e && e.point) {
      if (e.point.category === null) {
        return (
          <div>
            <p>Category: NULL </p>
            <p>Percentage: {Number(e.point.dataItem.percentage).toFixed(2)}%</p>
          </div>
        );
      }
      return (
        <div>
          <p>Category: {e.point.category}</p>
          <p>Percentage: {Number(e.point.dataItem.percentage).toFixed(2)}%</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="local-percentage">
      <Chart>
        <ChartSeries>
          <ChartSeriesItem
            type="pie"
            data={percentages}
            categoryField="field"
            field="percentage"
          />
        </ChartSeries>
        <ChartTooltip render={renderTooltip} />
        <ChartLegend visible={false} />
      </Chart>
    </div>
  );
};

export default LocalPercentage;
