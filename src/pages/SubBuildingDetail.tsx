import React, { useState, useEffect } from "react";
import { buildingInfo_interface } from "./../interface/buildingInfo_interface";
import SubBuildingList from "../component/SubBuildingComponent/subBuildingList";
import SubBuildingTotalAnalysisTable from "../component/SubBuildingComponent/subBuildingTotalAnalysisTable";
import { subBuildingInfo_interface } from "../interface/subBuildingInfo_interface";

const SubBuildingDetail = (props: any) => {
  const [buildingInfo, setBuildingInfo] = useState<
    buildingInfo_interface | undefined
  >();

  const [subBuildingInfo, setSubBuildingInfo] = useState<
  subBuildingInfo_interface | undefined
>();

  useEffect(() => {
    setBuildingInfo(props.buildingInfo);
  }, [props]);

  return (
    <div className="sub-building-list">
      <SubBuildingList buildingInfo = {buildingInfo} />

      <div className="sub-building-detail">
        <SubBuildingTotalAnalysisTable buildingId = {buildingInfo?.id} subBuildingDetail = {subBuildingInfo} />
      </div>
    </div>
  );
};

export default SubBuildingDetail;