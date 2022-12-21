import React, {useEffect, useState} from "react";
import GridHeader from "./GridHeader.jsx";
import {connect} from "react-redux";
import VirtualizedGridV2 from "./VirtualizedGridV2.jsx";
import {Button} from "@mui/material";
import {ApplicationService} from "../../../service/ApplicationService.js";
import {setNextTablePageIsLoading, setTableHasMore} from "../../../redux/attempts/actions.js";

const tableWidth = 1000;
const pageSize = 25;


function Table({tableNextPageIsLoading, setTableNextPageLoading, hasMore, setHasMore}) {
    const [attempts, setAttempts] = React.useState([]);


    const urlParams = new URLSearchParams(window.location.search);


    // Current query params
    const [searchId, setSearchId] = React.useState(urlParams.get("id")) || "";
    const [searchX, setSearchX] = React.useState(urlParams.get("x")) || "";
    const [searchY, setSearchY] = React.useState(urlParams.get("y")) || "";
    const [searchR, setSearchR] = React.useState(urlParams.get("r")) || "";
    const [searchResult, setSearchResult] = React.useState(urlParams.get("result")) || "";
    const [searchTime, setSearchTime] = React.useState(urlParams.get("time")) || "";
    const [searchProcessingTime, setSearchProcessingTime] = React.useState(urlParams.get("processTime")) || "";

    // True params the search is based on
    const [currentSearchParams, setCurrentSearchParams] = React.useState({
        searchId: searchId,
        searchX: searchX,
        searchY: searchY,
        searchR: searchR,
        searchResult: searchResult,
        searchTime: searchTime,
        searchProcessingTime: searchProcessingTime
    })

    const infiniteLoaderRef = React.useRef(null);


    function loadNextPage() {
        setTableNextPageLoading(true);
        return ApplicationService.getAttemptsWithOffset(attempts.length, pageSize, currentSearchParams)
            .then(response => response.json())
            .then(data => {
                setAttempts(attempts.concat(data.attempts));
                setHasMore(data.has_more);
                setTableNextPageLoading(false);
            })
    }


    function onSearchClick() {
        setTableNextPageLoading(false);
        setHasMore(true);
        setCurrentSearchParams({
            searchId: searchId,
            searchX: searchX,
            searchY: searchY,
            searchR: searchR,
            searchResult: searchResult,
            searchTime: searchTime,
            searchProcessingTime: searchProcessingTime,
        })
        setAttempts([]);
    }

    useEffect(() => {
        if (infiniteLoaderRef.current) {
            infiniteLoaderRef.current.resetloadMoreItemsCache(false);
            loadNextPage()
        }
        const urlParams = new URLSearchParams(window.location.search);
        function setParam(name, value) {
            if (value) {
                urlParams.set(name, value);
            } else {
                urlParams.delete(name);
            }
        }
        setParam("id", searchId);
        setParam("x", searchX);
        setParam("y", searchY);
        setParam("r", searchR);
        setParam("result", searchResult);
        setParam("time", searchTime);
        setParam("processTime", searchProcessingTime);
        // change url without reloading the page
        window.history.replaceState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
    }, [currentSearchParams])

    return (<div style={{overflow: "auto", width: {tableWidth}}}>

        <Button variant="outlined" onClick={onSearchClick}>
            Search!
        </Button>

        <GridHeader width={tableWidth} searchId={searchId} searchX={searchX} searchY={searchY} searchR={searchR}
                    searchResult={searchResult} searchTime={searchTime} searchProcessingTime={searchProcessingTime}
                    setSearchId={setSearchId} setSearchX={setSearchX} setSearchY={setSearchY} setSearchR={setSearchR}
                    setSearchResult={setSearchResult} setSearchTime={setSearchTime}
                    setSearchProcessingTime={setSearchProcessingTime}/>

        <VirtualizedGridV2 width={tableWidth} attempts={attempts} hasMore={hasMore} setHasMore={setHasMore}
                           loadNextPage={loadNextPage} setAttempts={setAttempts}
                           isNextPageLoading={tableNextPageIsLoading} setNextPageLoading={setTableNextPageLoading}
                           infiniteLoaderRef={infiniteLoaderRef}/>
    </div>)
}

function mapStateToProps(state) {
    return {
        tableNextPageIsLoading: state.tableNextPageIsLoading,
        hasMore: state.tableHasMore,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTableNextPageLoading: (isLoading) => dispatch(setNextTablePageIsLoading(isLoading)),
        setHasMore: (hasMore) => dispatch(setTableHasMore(hasMore)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)

