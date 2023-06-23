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

const CompanyPercentage = () => {
  const [percentages, setPercentages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/dashboard/project/construction_company_ratio"
        );
        const data = JSON.parse(response.data);
        setPercentages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const labelContent = (e: any) =>
    e.category + "(" + (Number(e.percentage) * 100).toFixed(2) + "%)";

  const renderTooltip = (e: any) => {
    if (e && e.point) {
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
    <div>
      <Chart>
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={percentages}
            categoryField="field"
            field="percentage"
            autoFit={true}
            holeSize={100}
          >
          </ChartSeriesItem>
        </ChartSeries>
        <ChartTooltip render={renderTooltip} />
        <ChartLegend visible={false} />
      </Chart>
    </div>
  );
};

export default CompanyPercentage;
