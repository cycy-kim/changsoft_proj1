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
import {project_interface} from "./../../interface/project_interface"

//{ field: "construction_company", operator: "eq", value: "" }
const ProjectList = (props: any) => {
  const [projectList, setProjectList] = useState<string[]>([]);
  const [selectedProjectName, setSelectedProjectName] =
    useState<string>("project를 선택해주세요");

  const [projectFilter, setProjectFilter] = useState<CompositeFilterDescriptor>(
    {
      logic: "and",
      filters: [],
    }
  );
  const [fileteredList, setFileteredList] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<project_interface[]>([]);
  const [data, setData] = useState<project_interface[]>([]);

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
        setFilteredData(data);
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

  const projectListOnChange = (event: any) => {
    setSelectedProjectName(event.target.value);
    props.setSelectedProjectName(event.target.value);
  };

  const applyFilter = () => {};

  const construction_company_onChange = (event: any) => {

    

    projectFilter.filters.push({
      field: "construction_company",
      operator: "eq",
      value: event.target.value,
    });

    setFilteredData(filterBy(filteredData, projectFilter));
    console.log( filterBy(filteredData, projectFilter));
  };
  const location_onChange = (event: any) => {};

  return (
    <div>
      <ComboBox
        data={fileteredList}
        value={selectedProjectName}
        onChange={projectListOnChange}
        onFilterChange={filterChange}
        filterable={true}
        style={{ width: "300px" }}
      />

      <div style={{ width: "300px" }}>
        <DropDownList
          onChange={construction_company_onChange}
          data={data
            .map((item) => item.construction_company)
            .filter((value, index, array) => array.indexOf(value) === index)}
        />

        <DropDownList
          onChange={location_onChange}
          data={data
            .map((item) => item.location)
            .filter((value, index, array) => array.indexOf(value) === index)}
        />
        <Button onClick={applyFilter}>apply filters</Button>
      </div>
    </div>
  );
};

export default ProjectList;
