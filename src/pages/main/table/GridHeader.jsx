import React from 'react';
import {TextField} from "@mui/material";

export default function GridHeader({
                        width,
                        searchId,
                        searchX,
                        searchY,
                        searchR,
                        searchResult,
                        searchTime,
                        searchProcessingTime,
                        setSearchId,
                        setSearchX,
                        setSearchY,
                        setSearchR,
                        setSearchResult,
                        setSearchTime,
                        setSearchProcessingTime,

                    }) {


    function handleChange(e) {
        switch (e.target.name) {
            case "id":
                setSearchId(e.target.value);
                break;
            case "x":
                setSearchX(e.target.value);
                break;
            case "y":
                setSearchY(e.target.value);
                break;
            case "r":
                setSearchR(e.target.value);
                break;
            case "result":
                setSearchResult(e.target.value);
                break;
            case "time":
                setSearchTime(e.target.value);
                break;
            case "processTime":
                setSearchProcessingTime(e.target.value);
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

