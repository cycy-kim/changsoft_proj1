import {
  useState,
  useEffect,
} from "react";
import axios from "axios";
import "./../../styles/projectIntro.scss"

const ProjectIntro = () => {
  const [projectNum, setProjectNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //"http://192.168.0.129:8000/data/building",
          "http://10.221.71.135:8000/data/project_num"
        );
        const data = JSON.parse(response.data);
        //console.log(data);
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

export default ProjectIntro;
