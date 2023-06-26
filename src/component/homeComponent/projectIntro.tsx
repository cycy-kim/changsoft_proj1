import {
  useState,
  useEffect,
} from "react";
import axios from "axios";
import "./../../styles/projectIntro.scss"
import urlPrefix from "./../../resource/URL_prefix.json"

const TotalProject = () => {
  const [projectNum, setProjectNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //"http://192.168.0.129:8000/data/building",
          urlPrefix.IP_port + "/dashboard/project/count"
        );
        const data = JSON.parse(response.data);
        setProjectNum(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="total-project-num">{projectNum}</div>
    </div>
  );
};

export default TotalProject;
