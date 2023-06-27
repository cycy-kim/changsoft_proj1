import * as React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
} from "@progress/kendo-react-charts";

export const TotalAreaByCompany = () => {
  // Sample data
  const data = [
    { construction_company: "KCC건설", total_area_sum: 35890.48 },
    { construction_company: "현대엔지니어링", total_area_sum: 86206.98 },
    { construction_company: "신세계건설", total_area_sum: 103848.081 },
    { construction_company: "동부건설", total_area_sum: 297277.7614 },
    { construction_company: "우미건설", total_area_sum: 333163.8181 },
    { construction_company: "계룡건설", total_area_sum: 408247.5856 },
  ];

  // Transform the data for the Bar Chart
  const chartData = data.map((item) => ({
    category: item.construction_company,
    value: item.total_area_sum,
  }));

  return (
    <Chart style={{height: "36vh"}}>
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          categories={chartData.map((item) => item.category)}
        />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem />
      </ChartValueAxis>
      <ChartSeries>
        <ChartSeriesItem type="donut" data={chartData} field="value" />
      </ChartSeries>
    </Chart>
  );
};
