import React, {
  useState,
  useEffect,
} from "react";
import {
  Grid,
  GridColumn,
  getSelectedState,
  getSelectedStateFromKeyDown,
  GridToolbar,
} from "@progress/kendo-react-grid";
import axios from "axios";
import urlPrefix from "./../../resource/URL_prefix.json";
import { buildingInfo_interface} from "./../../interface/buildingInfo_interface";

const BuildingDetail = (props: any) => {
  const [imgPath, setImgPath] = useState<string>("");
  const [buildingInfo , setBuildingInfo] = useState<buildingInfo_interface | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(props.buildingInfo)
        
        const response = await axios.get(
          urlPrefix.IP_port +
            "/project/" +
            props.buildingInfo[0].project_id +
            "/building/" +
            props.buildingInfo[0].id
        );
        const data = JSON.parse(response.data);
        const importedImagePath = await import("./../../resource/project_pictures/" +
        data[0].project_name +
        "/" +
        data[0].building_name +
        "/ScreenShot.png");

        setBuildingInfo(props.buildingInfo);
        setImgPath(importedImagePath.default);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props, imgPath]);

  return <div>
    {imgPath && <img src={imgPath} alt="Building Image" height = {"300px"} width = {"400px"}/>}

    <Grid data={[props.buildingInfo]}>
        <GridColumn field="project_name" title="프로젝트명" />
        <GridColumn field="building_count" title="프로젝트 내 빌딩수" />
      </Grid>
      <Grid data={[props.buildingInfo]}>
        <GridColumn field="building_area" title="건축면적" />
        <GridColumn field="construction_company" title="건설회사" />
        <GridColumn field="location" title="지역" />
        <GridColumn field="total_area" title="문서상 연면적" />
      </Grid>

      <Grid data={[props.buildingInfo]}>
        <GridColumn title="프로젝트 기간">
          <GridColumn field="construction_start" title="시작일" />
          <GridColumn field="construction_end" title="종료일" />
          <GridColumn field="total_date" title="소요일??" />
        </GridColumn>
      </Grid>
  
  </div>;
};

export default BuildingDetail;
