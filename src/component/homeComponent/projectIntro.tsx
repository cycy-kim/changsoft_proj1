import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
} from "react";
import {
  Grid,
  GridColumn,
  getSelectedState,
  getSelectedStateFromKeyDown,
} from "@progress/kendo-react-grid";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
  IntlService,
} from "@progress/kendo-react-intl";
import { getter } from "@progress/kendo-react-common";
import {
  filterBy,
  CompositeFilterDescriptor,
  GroupDescriptor,
  groupBy,
  GroupResult,
  State,
  DataResult,
  process,
  AggregateDescriptor,
} from "@progress/kendo-data-query";
import {
  setExpandedState,
  setGroupIds,
} from "@progress/kendo-react-data-tools";
import axios from "axios";
import { MultiSelectPropsContext } from "@progress/kendo-react-dropdowns";
import "./../../styles/projectIntro.scss"

const ProjectIntro = () => {
  const [projectNum, setProjectNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //"http://192.168.0.129:8000/data/building",
          "http://10.221.71.135:8000/data/project_num"
        );
        const data = JSON.parse(response.data);
        console.log(data);
        setProjectNum(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      Number of total projects:
      <br />
      <div className="total-project-num">{projectNum}</div>
    </div>
  );
};

export default ProjectIntro;
