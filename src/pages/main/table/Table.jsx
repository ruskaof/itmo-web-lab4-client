import React from "react";
import GridHeader from "./GridHeader.jsx";
import {
    setTableSearchId,
    setTableSearchProcessingTime,
    setTableSearchR,
    setTableSearchResult,
    setTableSearchTime,
    setTableSearchX,
    setTableSearchY
} from "../../../redux/attempts/actions.js";
import {connect} from "react-redux";
import VirtualizedGridV2 from "./VirtualizedGridV2.jsx";

const tableWidth = 1200;

function Table(props) {
    return (<div style={{overflow: "auto", width: {tableWidth}}}>
        <GridHeader width={tableWidth} {...props}/>
        <VirtualizedGridV2/>
    </div>)
}


function mapStateToTableProps(state) {
    return {
        searchId: state.tableSearchId,
        searchX: state.tableSearchX,
        searchY: state.tableSearchY,
        searchR: state.tableSearchR,
        searchResult: state.tableSearchResult,
        searchTime: state.tableSearchTime,
        searchProcessTime: state.tableSearchProcessingTime,
    }
}

function mapDispatchToTableProps(dispatch) {
    return {
        setSearchId: (value) => dispatch(setTableSearchId(value)),
        setSearchX: (value) => dispatch(setTableSearchX(value)),
        setSearchY: (value) => dispatch(setTableSearchY(value)),
        setSearchR: (value) => dispatch(setTableSearchR(value)),
        setSearchResult: (value) => dispatch(setTableSearchResult(value)),
        setSearchTime: (value) => dispatch(setTableSearchTime(value)),
        setSearchProcessTime: (value) => dispatch(setTableSearchProcessingTime(value)),
    }
}

export default connect(mapStateToTableProps, mapDispatchToTableProps)(Table);