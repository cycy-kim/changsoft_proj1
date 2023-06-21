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
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { projectdetail } from "./../../interface/projectdetail_interface";
import urlPrefix from "./../../resource/URL_prefix.json"

const ProjectDetail = () => {
  //onst [buildingNums, setBuildingNums] = useState();
  const [selected, setSelected] = useState<string>("");
  const [projectList, setProjectList] = useState<projectdetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_num = await axios.get(
          //"http://192.168.0.129:8000/data/building",
          urlPrefix.IP_port + "/data/building_totalnum"
        );
        const data: projectdetail[] = JSON.parse(response_num.data);

        //console.log(data);
        setProjectList(data);
        setSelected(data[0].project_name);
        console.log(projectList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  return (
    <div>
      <DropDownList
        data={projectList.map((item) => item.project_name)}
        value={selected}
        onChange={handleChange}
        style={{
          width: "300px",
        }}
      />
      <br />
      <div>
        {projectList.find((item: projectdetail) => item.project_name === selected)?.id}번 선택ㅎ
      </div>
    </div>
  );
};

export default ProjectDetail;
