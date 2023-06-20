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
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
  IntlService,
} from "@progress/kendo-react-intl";
import { getter } from "@progress/kendo-react-common";
import {
  filterBy,
  CompositeFilterDescriptor,
  GroupDescriptor,
  groupBy,
  GroupResult,
  State,
  DataResult,
  process,
  AggregateDescriptor,
} from "@progress/kendo-data-query";
import {
  setExpandedState,
  setGroupIds,
} from "@progress/kendo-react-data-tools";
import axios from "axios";
import { building } from "./../interface/building";
import { MultiSelectPropsContext } from "@progress/kendo-react-dropdowns";

const DATA_ITEM_KEY = "id"
const SELECTED_FIELD = "selected";
const initialDataState = {
  skip: 0,
  take: 10,
};

const DetailComponent = (props:any) => {
  //console.log(props.dataItem.id)
  //console.log(props.dataItem.id)

  return(<div>
    
  </div>)
}


const BuildingList = () => {
  const [buildingList, setBuildingList] = useState<building[]>([]);
  const [page, setPage] = React.useState(initialDataState);
  const [pageSizeValue, setPageSizeValue] = React.useState();
  const [selectedState, setSelectedState] = React.useState({});
  const [categories, setCategories] = React.useState([]);

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
          //"http://192.168.0.129:8000/data/building",
          "http://10.221.71.135:8000/data/building"
        );
        const data = JSON.parse(response.data);
        //console.log(data);
        setBuildingList(data);
        

        /*
        const temp: building[] = [
          {
            id: 1,
            building_name: "name1",
            building_type: "type1",
            project_id: 1,
          },
          {
            id: 2,
            building_name: "name2",
            building_type: "type2",
            project_id: 2,
          },
          {
            id: 3,
            building_name: "name3",
            building_type: "type3",
            project_id: 3,
          },
        ];
        console.log(temp);
        setBuildingList(
          temp.map((dataItem) =>
            Object.assign(
              {
                selected: false,
              },
              dataItem
            )
          )
        );
        */
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSelectionChange = (event:any) => {
    const newSelectedState = getSelectedState({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
    //console.log(selectedState)
  };
  const onKeyDown = (event:any) => {
    const newSelectedState = getSelectedStateFromKeyDown({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
    //console.log(selectedState)
  };
  const expandChange = (event:any) => {
    event.dataItem.expanded = event.value;
    let categoryID = event.dataItem.CategoryID;
    setCategories([...categories]);
    if (!event.value || event.dataItem.details) {
      return;
    }
  };
  return (
    <div>
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
        <GridColumn field="id" />
        <GridColumn field="building_name" />
        <GridColumn field="building_type" />
        <GridColumn field="project_id" />
      </Grid>
    </div>
  );
};

export default BuildingList;
