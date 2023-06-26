import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
} from "react";
import {
  Grid,
  GridColumn,
  getSelectedState,
  getSelectedStateFromKeyDown,
} from "@progress/kendo-react-grid";
import axios from "axios";
import { building } from "./../interface/building";
import { MultiSelectPropsContext } from "@progress/kendo-react-dropdowns";
import BuildingDetail from "./buildingDetail";
import ProjectIntro from "./homeComponent/projectIntro";
import urlPrefix from "./../resource/URL_prefix.json";

const DATA_ITEM_KEY = "id";
const SELECTED_FIELD = "selected";
const initialDataState = {
  skip: 0,
  take: 10,
};

//여기에 빌딩상세정보
const DetailComponent = (props: any) => {
  return (
    <div>
      <BuildingDetail building_Id={props.dataItem.id} />
    </div>
  );
};

const BuildingList = () => {
  const [buildingList, setBuildingList] = useState<building[]>([]);
  const [page, setPage] = React.useState(initialDataState);
  const [pageSizeValue, setPageSizeValue] = React.useState();
  const [selectedState, setSelectedState] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [attributeNames, setAttributeNames] = useState<string[]>([""]);

  const pageChange = (event: any) => {
    const targetEvent = event.targetEvent;
    const take = targetEvent.value === "All" ? 77 : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          urlPrefix.IP_port + "/dashboard/building"
        );
        const data = JSON.parse(response.data);

        setAttributeNames(Object.keys(data[0]));
        setBuildingList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSelectionChange = (event: any) => {
    const newSelectedState = getSelectedState({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
    //console.log(selectedState)
  };
  const onKeyDown = (event: any) => {
    const newSelectedState = getSelectedStateFromKeyDown({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
    //console.log(selectedState)
  };
  const expandChange = (event: any) => {
    event.dataItem.expanded = event.value;
    setCategories([...categories]);
    if (!event.value || event.dataItem.details) {
      return;
    }
  };
  return (
    <div className="building-list-container">
      <Grid
        style={{ height: "400px" }}
        data={buildingList.slice(page.skip, page.take + page.skip)}
        skip={page.skip}
        take={page.take}
        total={buildingList.length}
        dataItemKey={DATA_ITEM_KEY}
        selectedField={SELECTED_FIELD}
        selectable={{
          enabled: true,
        }}
        pageable={{
          buttonCount: 4,
          pageSizes: [5, 10, 15, "All"],
          pageSizeValue: pageSizeValue,
        }}
        onSelectionChange={onSelectionChange}
        onKeyDown={onKeyDown}
        onPageChange={pageChange}
        expandField="expanded"
        detail={DetailComponent}
        onExpandChange={expandChange}
      >
        {attributeNames.map((attr) => (
          <GridColumn field={attr} />
        ))}
      </Grid>
    </div>
  );
};

export default BuildingList;
