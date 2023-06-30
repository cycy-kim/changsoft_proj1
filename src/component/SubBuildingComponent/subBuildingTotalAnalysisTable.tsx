import React, { useEffect, useState } from "react";
import axios from "axios";
import urlPrefix from "../../resource/URL_prefix.json";
import { subBuildingInfo_interface } from "../../interface/subBuildingInfo_interface";

const SubBuildingTotalAnalysisTable = (props: any) => {
  const [subBuildingDetail, setSubBuildingDetail] =
    useState<subBuildingInfo_interface>();

  const [buildingId, setBuildingId] = useState<number[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port +
            "/building/" +
            props.buildingId +
            "/sub_building/" +
            props.selectedSubBuildingId +
            "/total"
        );
        const data: subBuildingInfo_interface = JSON.parse(response.data);
        setSubBuildingDetail(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.buildingId, props.selectedSubBuildingId]);

  return (
    <div>
      {subBuildingDetail && (
        <div>
          <h3>{subBuildingDetail.sub_building_name}</h3>
          {/* Render additional sub building details */}
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default SubBuildingTotalAnalysisTable;
