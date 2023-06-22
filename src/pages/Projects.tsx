import BuildingList from "./../component/buildingList";
import React, { useEffect, useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export const Projects: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    fetch("http://192.168.0.129:8000/project/project_name")
      .then((response) => response.json())
      .then((json) => {
        const constructionCompanies = JSON.parse(json);
        setData(constructionCompanies);
      })
      .catch((error) => {
        console.error("Failed to fetch construction companies:", error);
      });
  }, []);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleDropdownChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="projects">
      <DropDownList
        data={data}
        value={value}
        onChange={handleChange}
        filterable={true}
        style={{ width: "300px" }}
      />
      <div className="projects">
        <BuildingList gridValue={selectedValue} />
      </div>
    </div>
  );
};
