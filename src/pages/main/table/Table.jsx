import React from "react";
import VirtualizedGrid from "./VirtualizedGrid.jsx";
import GridHeader from "./GridHeader.jsx";

const tableWidth = 800;

export default function Table() {
    return (
        <div style={{overflow: "auto"}}>
            <GridHeader width={tableWidth}/>
            <VirtualizedGrid width={tableWidth}/>
        </div>
    )
}