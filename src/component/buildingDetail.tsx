import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
  lazy,
} from "react";
import {
  Grid,
  GridColumn,
  getSelectedState,
  getSelectedStateFromKeyDown,
  GridToolbar,
} from "@progress/kendo-react-grid";
import axios from "axios";
import urlPrefix from "./../resource/URL_prefix.json";
import { ExcelExport } from "@progress/kendo-react-excel-export";

const BuildingDetail = (props: any) => {
  const [imgPath, setImgPath] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(
          urlPrefix.IP_port +
            "/project/" +
            props.projectId +
            "/building/" +
            props.buildingId
        );
        const data = JSON.parse(response.data);
        const importedImagePath = await import("./../resource/project_pictures/" +
        data[0].project_name +
        "/" +
        data[0].building_name +
        "/ScreenShot.png");
        setImgPath(importedImagePath.default);

        console.log(imgPath)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props, imgPath]);

  return <div>
    {imgPath && <img src={imgPath} alt="Building Image" height = {"300px"} width = {"400px"}/>}
  </div>;
};

export default BuildingDetail;
