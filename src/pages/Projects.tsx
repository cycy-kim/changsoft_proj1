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

interface projectList_interface {
  project_name: string;
}

const Projects = () => {
  const [projectList, setProjectList] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [fileteredList,setFileteredList ] = useState<string[]>([]);

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
          urlPrefix.IP_port + "/project/project_name"
        );
        const data = JSON.parse(response.data);

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
    setSelected(event.target.value);
  };

  return (
    <div className="projects">
      <DropDownList
        data={fileteredList}
        value={selected}
        onChange={handleChange}
        onFilterChange={filterChange}
        filterable={true}
        style={{ width: "300px" }}
      />
      <div className="projects">
        <BuildingList />
      </div>
    </div>
  );
};

export default Projects;
