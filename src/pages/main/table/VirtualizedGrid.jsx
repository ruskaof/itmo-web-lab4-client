import React, {useEffect} from "react";
import {FixedSizeList} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {connect} from "react-redux";
import {getRowsCount} from "../../../redux/attempts/actions.js";
import {ApplicationService} from "../../../service/ApplicationService.js";
import {Skeleton} from "@mui/material";

let items = {}
const itemHeight = 50;

function VirtualizedGrid(props) {
    const {nRows, getRowsCount, width, ...fieldData} = props;


    const Row = ({index, style}) => {
        const item = items[index];
        if (!item) {
            return <div style={{...style, display: "flex", alignItems: "center", justifyContent: "center"}}><Skeleton
                variant="rounded" height={itemHeight * 0.7} width={width}/></div>
        } else {
            return <div style={style} className="datagrid">
                <div className="datagrid__row-item">
                    <div className="datagrid__cell">{item.id}</div>
                </div>
                <div className="datagrid__row-item">
                    <div className="datagrid__cell">{item.x}</div>
                </div>
                <div className="datagrid__row-item">
                    <div className="datagrid__cell">{item.y}</div>
                </div>
                <div className="datagrid__row-item">
                    <div className="datagrid__cell">{item.r}</div>
                </div>
                <div className="datagrid__row-item">
                    <div
                        className={item.result ? "datagrid__cell-hit" : "datagrid__cell-miss"}>{item.result ? "hit" : "miss"}</div>
                </div>
                <div className="datagrid__row-item">
                    <div className="datagrid__cell">{item.attemptTime}</div>
                </div>
                <div className="datagrid__row-item">
                    <div className="datagrid__cell">{item.processingTimeNanos}</div>
                </div>
            </div>
        }
    }

    useEffect(() => {
        getRowsCount()
    })

    useEffect(() => {
        items = {}
    }, [fieldData])

    const isItemLoaded = (index) => !!items[index]

    const loadMoreItems = (startIndex, stopIndex) => {
        const key = `${startIndex}-${stopIndex}`
        const length = stopIndex - startIndex
        const visibleRange = [...Array(length).keys()].map(i => i + startIndex)
        const itemsRetrieved = visibleRange.every(index => !!items[index])

        return ApplicationService.getAttemptsWithOffset(startIndex, length + 1, fieldData) // +1?
            .then(response => response.json())
            .then(response => {
                response.attempts.forEach((item, index) => {
                    items[startIndex + index] = item
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (<div style={{color: "white"}}>
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            loadMoreItems={loadMoreItems}
            itemCount={nRows}
        >
            {({onItemsRendered, ref}) => (<FixedSizeList
                height={500}
                itemCount={nRows}
                itemSize={itemHeight}
                onItemsRendered={onItemsRendered}
                ref={ref}
                width={width}
            >
                {Row}
            </FixedSizeList>)}

        </InfiniteLoader>
    </div>)

}


function mapDispatchToVirtualizedGridProps(dispatch) {
    return {
        getRowsCount: () => {
            dispatch(getRowsCount())
        }
    }
}


function mapStateToVirtualizedGridProps(state) {
    return {
        nRows: state.nRows,
    }
}

export default connect(mapStateToVirtualizedGridProps, mapDispatchToVirtualizedGridProps)(VirtualizedGrid)