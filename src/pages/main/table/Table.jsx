import React from "react";
import GridHeader from "./GridHeader.jsx";
import {connect} from "react-redux";
import VirtualizedGridV2 from "./VirtualizedGridV2.jsx";

const tableWidth = 1000 ;

export default function Table() {
    return (<div style={{overflow: "auto", width: {tableWidth}}}>
        <GridHeader width={tableWidth}/>
        <VirtualizedGridV2 width={tableWidth}/>
    </div>)
}

