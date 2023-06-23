import { useState, useEffect } from "react";
import axios from "axios";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { projectdetail } from "./../../interface/projectdetail_interface";
import urlPrefix from "./../../resource/URL_prefix.json";
import "../../styles/projectDetail.scss"

const ProjectDetail = () => {
  const [buildingNum, setBuildingNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response_num = await axios.get(
          urlPrefix.IP_port + "/building_count"
        );
        
        const data  = JSON.parse(response_num.data);
        setBuildingNum(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="total-building-num">
      {buildingNum}
    </div>
  );
};

export default ProjectDetail;
