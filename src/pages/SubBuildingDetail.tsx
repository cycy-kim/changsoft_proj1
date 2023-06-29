import React, { useState, useEffect } from "react";
import { buildingInfo_interface } from "./../interface/buildingInfo_interface";
import SubBuildingList from "../component/SubBuildingComponent/subBuildingList";

const SubBuildingDetail = (props: any) => {
  const [buildingInfo, setBuildingInfo] = useState<
    buildingInfo_interface | undefined
  >();

  useEffect(() => {
    setBuildingInfo(props.buildingInfo);
  }, [props]);

  return (
    <div>
      <SubBuildingList buildingInfo = {buildingInfo} />
    </div>
  );
};

export default SubBuildingDetail;
