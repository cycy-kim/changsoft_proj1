import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import urlPrefix from "./../../resource/URL_prefix.json";

const labelContent = (e: any) =>
  e.category + "(" + (Number(e.percentage) * 100).toFixed(2) + "%)";

const CompanyPercentage = () => {
    const [percentages, setPercentages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(urlPrefix.IP_port + "/dashboard/project/construction_company_ratio");
            const data = response.data;
            setPercentages(data);
            
            setPercentages(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
    
      return (
        <div>
          <Chart>
            <ChartSeries>
              <ChartSeriesItem
                type="donut"
                data={percentages}
                categoryField="sub_building_type"
                field="COUNT"
                autoFit = {true}
                holeSize = {100}
              >
                <ChartSeriesLabels
                  color="#000"
                  background="none"
                  position="outsideEnd"
                  content={labelContent}
                />
              </ChartSeriesItem>
            </ChartSeries>
            <ChartLegend visible={false} />
          </Chart>
        </div>
      );
};

export default CompanyPercentage;
