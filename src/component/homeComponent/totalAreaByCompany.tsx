import React from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem } from '@progress/kendo-react-charts';

const TotalAreaByCompany: React.FC = () => {
  const data = [
    { region: 'North', value: 120 },
    { region: 'South', value: 250 },
    { region: 'East', value: 180 },
    { region: 'West', value: 150 },
  ];

  return (
    <div>
      <Chart style={{ height: "35vh" }}>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={['North', 'South', 'East', 'West']} />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem type= "area" data={data} field="value" name="Sales" />
        </ChartSeries>
      </Chart>
    </div>
  );
};

export default TotalAreaByCompany;
