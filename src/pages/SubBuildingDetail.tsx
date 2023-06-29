import React, { useState, useEffect } from "react";
import { buildingInfo_interface } from "./../interface/buildingInfo_interface";

const SubBuildingDetail = (props: any) => {
  const [buildingInfo, setBuildingInfo] = useState<
    buildingInfo_interface | undefined
  >();

  useEffect(() => {
    setBuildingInfo(props.buildingInfo);
  }, [props]);



  return <div>{buildingInfo?.id}</div>;
};

export default SubBuildingDetail;
