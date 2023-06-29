import React, { useEffect, useState } from "react";
import { DropDownList, ComboBox } from "@progress/kendo-react-dropdowns";
import {
  CompositeFilterDescriptor,
  filterBy,
  FilterDescriptor,
} from "@progress/kendo-data-query";
import axios from "axios";
import urlPrefix from "../../resource/URL_prefix.json";
import { projectList_interface } from "./../../interface/projectList_interface";
import { buildingInfo_interface } from "./../../interface/buildingInfo_interface";
import { subBuildingInfo_interface } from "../../interface/subBuildingInfo_interface";

const SubBuildingList = (props: any) => {
  const [subBuildinglist, setSubBuildinglist] = useState<string[]>([]);

  const [selectedSubBuilding, setSelectedSubBuilding] = useState<number>(0);

  const [selectedBuilding, setSelectedBuilding] =
    useState<buildingInfo_interface>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSelectedBuilding(props.buildingInfo);
        const response = await axios.get(
          urlPrefix.IP_port + "/asd/" + props.buildingInfo.id
        );
        const data: subBuildingInfo_interface[] = JSON.parse(response.data); // assuming the API response contains an array of buildings
        //console.log(data)
        setSubBuildinglist(
          data.map((obj: subBuildingInfo_interface) => obj.sub_building_name)
        );

        console.log(data.map((obj: subBuildingInfo_interface) => obj.sub_building_name))
        console.log(subBuildinglist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props]);

  return (
    <div>
      <DropDownList
        data={subBuildinglist}
        textField="name" // assuming the building object has a "name" property
        dataItemKey="id" // assuming the building object has an "id" property
        value={selectedBuilding ? selectedBuilding.id : null}
        // onChange={handleBuildingChange}
      />
      {
        //SubBuildingList && (
        //<div>
        //<h3>{SubBuildingList.sub_building_name}</h3>
        //{/* Render additional building details */}
        //</div>
        //)
      }
    </div>
  );
};

export default SubBuildingList;
