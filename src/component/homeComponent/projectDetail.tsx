import { useState, useEffect } from "react";
import axios from "axios";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { projectdetail } from "./../../interface/projectdetail_interface";
import urlPrefix from "./../../resource/URL_prefix.json";

const ProjectDetail = () => {
  const [buildingNums, setBuildingNums] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response_num = await axios.get(
          urlPrefix.IP_port + "/building/count"
        );
        
        const data  = JSON.parse(response_num.data);
        setBuildingNums(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {buildingNums}
    </div>
  );
};

export default ProjectDetail;
