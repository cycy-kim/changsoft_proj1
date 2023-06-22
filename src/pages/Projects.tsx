import BuildingList from "./../component/buildingList";
import React, { useEffect, useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import axios from "axios";
import urlPrefix from "./../resource/URL_prefix.json";

interface projectList_interface{
  project_name:string;
}

const Projects = () => {
  const [projectList, setProjectList] = useState<projectList_interface[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlPrefix.IP_port + "/project/project_name");
        const data = JSON.parse(response.data);

        const projectNames = data.map((obj:projectList_interface) => obj.project_name)
        setProjectList(projectNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  const handleDropdownChange = (value: string) => {
    setSelected(value);
  };

  return (
    <div className="projects">
      <DropDownList
        data={projectList}
        value={selected}
        onChange={handleChange}
        filterable={true}
        style={{ width: "300px" }}
      />
      <div className="projects">
        <BuildingList />
      </div>
    </div>
  );
};

export {Projects}