import React, { useEffect, useState } from "react";
import {
  DropDownList,
  DropDownListFilterChangeEvent,
  ComboBox,
} from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import {
  CompositeFilterDescriptor,
  filterBy,
  FilterDescriptor,
} from "@progress/kendo-data-query";
import axios from "axios";
import urlPrefix from "../../resource/URL_prefix.json";
import { projectList_interface } from "./../../interface/projectList_interface";

let constructionCompanyFilter: CompositeFilterDescriptor = {
  //filter 여러개가 적용될때 and, or?
  logic: "and",
  filters: [{ field: "construction_company", operator: "eq", value: "" }],
};
let locationFilter: CompositeFilterDescriptor = {
  //filter 여러개가 적용될때 and, or?
  logic: "and",
  filters: [{ field: "location", operator: "eq", value: "" }],
};

const ProjectList = (props: any) => {
  const [projectList, setProjectList] = useState<string[]>([]);
  const [selectedProjectName, setSelectedProjectName] =
    useState<string>("project를 선택해주세요");

  const [filters, setFilters] = useState<CompositeFilterDescriptor[]>([]);
  const [fileteredList, setFileteredList] = useState<string[]>([]);
  const [data, setData] = useState<[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/dashboard/project/"
        );
        const data = JSON.parse(response.data);

        const projectNames = data.map(
          (obj: projectList_interface) => obj.project_name
        );

        setData(data); //projectList의 project data
        props.setData(data); //projects 페이지의 project data
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

  const filterChange = (event: any) => {
    setFileteredList(filterData(event.filter));
  };

  const handleChange = (event: any) => {
    setSelectedProjectName(event.target.value);
    props.setSelectedProjectName(event.target.value);
  };

  const applyFilter = () => {};

  return (
    <div>
      <ComboBox
        data={fileteredList}
        value={selectedProjectName}
        onChange={handleChange}
        onFilterChange={filterChange}
        filterable={true}
        style={{ width: "300px" }}
      />

      <div style={{ width: "300px" }}>
        <DropDownList

          data={data.reduce((acc, { construction_company }) => {
            return acc.includes(construction_company)
              ? acc
              : [...acc, construction_company];
          }, [])}


        />
        <DropDownList

          data={data.reduce((acc, { location }) => {
            return acc.includes(location) ? acc : [...acc, location];
          }, [])}

          
        />
        <Button onClick={applyFilter}>apply filters</Button>
      </div>

    </div>
  );
};

export default ProjectList;
