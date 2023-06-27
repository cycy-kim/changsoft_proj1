import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem } from '@progress/kendo-react-charts';

export const TotalAreaByCompany = () => {
  const [constructionData, setConstructionData] = useState<{ construction_company: string; total_area_sum: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.221.72.80:8000/dashboard/project/construction_company_total_area');
        const jsonData = JSON.parse(response.data);
        setConstructionData(jsonData);
      } catch (error) {
        console.error('Error fetching construction data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart style={{ height: "36vh" }}>
        <ChartSeries>
          <ChartSeriesItem
            type="heatmap"
            data={constructionData}
            field="total_area_sum"
            categoryField="construction_company"
          />
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={constructionData.map(item => item.construction_company)} />
        </ChartCategoryAxis>
      </Chart>
    </div>
  );
};
