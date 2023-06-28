import BuildingList from "./../component/buildingList";
import React, { useEffect, useState } from "react";
import {
  DropDownList,
  DropDownListFilterChangeEvent,
} from "@progress/kendo-react-dropdowns";
import {
  CompositeFilterDescriptor,
  filterBy,
  FilterDescriptor,
} from "@progress/kendo-data-query";
import axios from "axios";
import urlPrefix from "./../resource/URL_prefix.json";
import ProjectDetail from "./../component/homeComponent/projectDetail";
import BuildingDetail from "./../component/buildingDetail";

interface projectList_interface {
  id: number;
  project_name: string;
}

const Projects = () => {
  const [projectList, setProjectList] = useState<string[]>([]);
  const [selectedProjectName, setSelectedProjectName] =
    useState<string>("project를 선택해주세요");
  const [fileteredList, setFileteredList] = useState<string[]>([]);
  const [data, setData] = useState<projectList_interface[]>([]);

  const filterData = (filter: FilterDescriptor | CompositeFilterDescriptor) => {
    const data = projectList.slice();
    return filterBy(data, filter);
  };

  const filterChange = (event: DropDownListFilterChangeEvent) => {
    setFileteredList(filterData(event.filter));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/project/id,project_name"
        );
        const data = JSON.parse(response.data);
        setData(data);

        const projectNames = data.map(
          (obj: projectList_interface) => obj.project_name
        );

        setProjectList(projectNames);
        setFileteredList(projectNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: any) => {
    setSelectedProjectName(event.target.value);
  };

  return (
    <div className="projects">
      <DropDownList
        data={fileteredList}
        value={selectedProjectName}
        onChange={handleChange}
        onFilterChange={filterChange}
        filterable={true}
        style={{ width: "300px" }}
      />

      <div className="projectDetail">
        <img style={{ width: "49%", float: "left", paddingLeft: "1%"}} alt="프로젝트 사진 들어갈 자리"/>
        <div style={{ width: "49%", float: "right", paddingLeft: "1%" }}>
          <ProjectDetail
            selectedProject={data.find(
              (data: any) => data.project_name === selectedProjectName
            )}
          />
        </div>
      </div>

      <div className="projects">
        <BuildingList projectName={selectedProjectName} projectList={data} />
      </div>
    </div>
  );
};

export default Projects;
