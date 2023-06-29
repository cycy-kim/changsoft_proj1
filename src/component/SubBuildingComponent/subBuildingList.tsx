import React, { useEffect, useState } from "react";
import {
  DropDownList,
  ComboBox,
} from "@progress/kendo-react-dropdowns";
import {
  CompositeFilterDescriptor,
  filterBy,
  FilterDescriptor,
} from "@progress/kendo-data-query";
import axios from "axios";
import urlPrefix from "../../resource/URL_prefix.json";
import {projectList_interface} from "./../../interface/projectList_interface"


const ProjectList = (props:any) => {
  const [projectList, setProjectList] = useState<string[]>([]);
  const [selectedProjectName, setSelectedProjectName] =
    useState<string>("sub building을 선택해주세요");
  const [fileteredList, setFileteredList] = useState<string[]>([]);
  const [data, setData] = useState<projectList_interface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/project/id,project_name"
        );
        const data = JSON.parse(response.data);

        const projectNames = data.map(
          (obj: projectList_interface) => obj.project_name
        );

        setData(data);
        props.setData(data);
        setProjectList(projectNames);
        setFileteredList(projectNames);
      
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const filterData = (filter: FilterDescriptor | CompositeFilterDescriptor) => {
    const data = projectList.slice();
    return filterBy(data, filter);
  };

  const handleChange = (event: any) => {
    setSelectedProjectName(event.target.value);
    props.setSelectedProjectName(event.target.value);
  };

  return (
    <div>
      <ComboBox
        data={fileteredList}
        value={selectedProjectName}
        onChange={handleChange}
        filterable={true}
        style={{ width: "300px" }}
      />
    </div>
  );
};

export default ProjectList;
