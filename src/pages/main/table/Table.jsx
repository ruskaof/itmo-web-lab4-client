import React from "react";
import VirtualizedGrid from "./VirtualizedGrid.jsx";
import GridHeader from "./GridHeader.jsx";

const tableWidth = 1200;

export default function Table() {
    return (
        <div style={{overflow: "auto", width:{tableWidth}}} >
            <GridHeader width={tableWidth}/>
            <VirtualizedGrid width={tableWidth}/>
        </div>
    )
}