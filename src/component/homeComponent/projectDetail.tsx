import { useState, useEffect } from "react";
import axios from "axios";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { projectdetail } from "./../../interface/projectdetail_interface";
import urlPrefix from "./../../resource/URL_prefix.json";

//projName:string, projList:projectdetail[]
const TotalBuildingDescription = (props: any) => {
  let description = "";
  if (props.projName === "Total") {
    description = "Number of total buildings is";
  } else {
    description =
      "Number of buildings in " +
      props.projList.find(
        (item: projectdetail) => item.project_name === props.projName
      )?.project_name +
      " is";
  }

  return (
    <div>
      {description}
      <br />
      {
        props.projList.find(
          (item: projectdetail) => item.project_name === props.projName
        )?.COUNT
      }
    </div>
  );
};

const ProjectDetail = () => {
  //onst [buildingNums, setBuildingNums] = useState();
  const [selected, setSelected] = useState<string>("Total");
  const [projectList, setProjectList] = useState<projectdetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*
        const response_num = await axios.get(
          //"http://192.168.0.129:8000/data/building",
          urlPrefix.IP_port + "/data/building_totalnum"
        );
        
        const data: projectdetail[] = JSON.parse(response_num.data);
        */

        ///
        let data: projectdetail[] = [];
        let cnt = 0;
        for (let i = 0; i < data.length; i++) {
          cnt += data[i].COUNT;
        }
        data.unshift({ id: 0, project_name: "Total", COUNT: cnt });
        setProjectList(data);

        console.log(projectList);
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
    <div>
      <DropDownList
        data={projectList.map((item) => item.project_name)}
        value={selected}
        onChange={handleChange}
        style={{
          width: "300px",
        }}
      />
      <br />
      <TotalBuildingDescription projName={selected} projList={projectList} />
    </div>
  );
};

export default ProjectDetail;
