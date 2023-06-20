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
  import { MultiSelectPropsContext } from "@progress/kendo-react-dropdowns";
  
  