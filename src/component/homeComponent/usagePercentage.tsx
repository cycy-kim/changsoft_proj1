import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
} from "react";
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
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
  } from "@progress/kendo-react-charts";
import {
  setExpandedState,
  setGroupIds,
} from "@progress/kendo-react-data-tools";
import "hammerjs";
import axios from "axios";


const UsagePercentage = () => {
    const [project, setProject] =useState(1);

    return (<div>

    </div>)
};