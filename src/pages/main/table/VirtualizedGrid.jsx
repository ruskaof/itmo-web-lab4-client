import React, {useEffect} from "react";
import {FixedSizeList} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {connect} from "react-redux";
import {fetchAttemptsWithOffset, getRowsCount} from "../../../redux/attempts/actions.js";
import {ApplicationService} from "../../../services/ApplicationService.js";

let items = {}
// let requestCache = {}

const Row = ({index, style}) => {
    const item = items[index];
    if (!item) {
        return <div style={style}>Loading...</div>
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
                <div className={item.result ? "datagrid__cell-hit" : "datagrid__cell-miss"}>{item.result ? "hit" : "miss"}</div>
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


function VirtualizedGrid({fetchAttemptsWithOffset, nRows, getRowsCount, width}) {

    useEffect(() => {
        getRowsCount()
    })

    const isItemLoaded = (index) => !!items[index]

    const loadMoreItems = (startIndex, stopIndex) => {
        const key = `${startIndex}-${stopIndex}`
        // if (requestCache[key]) {
        //     return requestCache[key]
        // }

        const length = stopIndex - startIndex
        const visibleRange = [...Array(length).keys()].map(i => i + startIndex)
        const itemsRetrieved = visibleRange.every(index => !!items[index])

        // if (itemsRetrieved) {
        //     requestCache[key] = key
        // }

        return ApplicationService.getAttemptsWithOffset(startIndex, length + 1) // +1?
            .then(response => {
                response.attempts.forEach((item, index) => {
                    items[startIndex + index] = item
                })
                // requestCache[key] = key
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
                    height={150}
                    itemCount={nRows}
                    itemSize={50}
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
        fetchAttemptsWithOffset: (offset, limit) => {
            dispatch(fetchAttemptsWithOffset(offset, limit))
        }, getRowsCount: () => {
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