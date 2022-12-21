import React from 'react';
import {TextField} from "@mui/material";
import {setGetParam} from "../../../utility/UrlState.js";
import {NumberParam, StringParam, useQueryParam} from "use-query-params";
import {clearTableCache} from "../../../redux/attempts/actions.js";
import {connect} from "react-redux";

function GridHeader({
                        width, clearTableCache,
                    }) {
    const [searchId, setSearchId] = useQueryParam("id", StringParam);
    const [searchX, setSearchX] = useQueryParam("x", StringParam);
    const [searchY, setSearchY] = useQueryParam("y", StringParam);
    const [searchR, setSearchR] = useQueryParam("r", StringParam);
    const [searchResult, setSearchResult] = useQueryParam("result", StringParam);
    const [searchTime, setSearchTIme] = useQueryParam("time", StringParam);
    const [searchProcessingTime, setSearchProcessingTime] = useQueryParam("processingTime", StringParam);

    function handleChange(e) {
        switch (e.target.name) {
            case "id":
                setSearchId(e.target.value);
                clearTableCache();
                break;
            case "x":
                setSearchX(e.target.value);
                clearTableCache();
                break;
            case "y":
                setSearchY(e.target.value);
                clearTableCache();
                break;
            case "r":
                setSearchR(e.target.value);
                clearTableCache();
                break;
            case "result":
                setSearchResult(e.target.value);
                clearTableCache();
                break;
            case "time":
                setSearchTIme(e.target.value);
                clearTableCache();
                break;
            case "processTime":
                setSearchProcessingTime(e.target.value);
                clearTableCache();
                break;
            default:
                break;

        }
    }

    return (<div className="datagrid" style={{width: width, marginTop: '10px'}}>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">ID</div>
            <div>
                <TextField variant="standard" size="small" name="id" value={searchId ? searchId : ""}
                           onChange={handleChange}/>
            </div>
        </div>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">X</div>
            <div>
                <TextField variant="standard" size="small" name="x" value={searchX ? searchX : ""}
                           onChange={handleChange}/>
            </div>
        </div>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">Y</div>
            <div>
                <TextField variant="standard" size="small" name="y" value={searchY ? searchY : ""}
                           onChange={handleChange}/>
            </div>
        </div>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">R</div>
            <div>
                <TextField variant="standard" size="small" name="r" value={searchR ? searchR : ""}
                           onChange={handleChange}/>
            </div>
        </div>
        <div className="datagrid__row-item">
            <div
                className="datagrid__cell">Result
            </div>
            <div>
                <TextField variant="standard" size="small" name="result" value={searchResult ? searchResult : ""}
                           onChange={handleChange}/>
            </div>
        </div>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">Time</div>
            <div>
                <TextField variant="standard" size="small" name="time" value={searchTime ? searchTime : ""}
                           onChange={handleChange}/>
            </div>
        </div>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">Process time</div>
            <div>
                <TextField variant="standard" size="small" name="processTime"
                           value={searchProcessingTime ? searchProcessingTime : ""}
                           onChange={handleChange}/>
            </div>
        </div>
    </div>);
}

function mapDispatchToProps(dispatch) {
    return {
        clearTableCache: () => dispatch(clearTableCache()),
    }
}

export default connect(null, mapDispatchToProps)(GridHeader);