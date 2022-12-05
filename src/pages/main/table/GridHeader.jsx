import React from 'react';

export default function GridHeader({width}) {
    return (<div className="datagrid" style={{width: width}}>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">ID</div>
        </div>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">X</div>
        </div>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">Y</div>
        </div>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">R</div>
        </div>
        <div className="datagrid__row-item">
            <div
                className="datagrid__cell">Result
            </div>
        </div>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">Time</div>
        </div>
        <div className="datagrid__row-item">
            <div className="datagrid__cell">Process time</div>
        </div>
    </div>);
}