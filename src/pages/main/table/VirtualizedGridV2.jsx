import React from "react";
import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList} from "react-window";
import {Box, LinearProgress} from "@mui/material";


export default function VirtualizedGridV2(props) {
    const {
        width, attempts, hasMore,
        setHasMore, loadNextPage, setAttempts,
        isNextPageLoading, setNextPageLoading,
        infiniteLoaderRef
    } = props;

    const itemCount = hasMore ? attempts.length + 1 : attempts.length;

    const loadMoreItems = isNextPageLoading ? () => {
    } : loadNextPage;

    const isItemLoaded = (index) => {
        return !hasMore || index < attempts.length;
    }

    const Item = ({index, style}) => {
        if (!isItemLoaded(index)) {
            return <Box sx={style} display="flex" justifyContent="center" alignItems="center">
                <div style={{width: "100%"}}>
                    <LinearProgress/>
                </div>
            </Box>
        } else {
            const item = attempts[index];
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
                    <div className="datagrid__cell">{item.attemptTime.replace("T", " ")}</div>
                </div>
                <div className="datagrid__row-item">
                    <div className="datagrid__cell">{item.processingTimeNanos}</div>
                </div>
            </div>
        }

    };

    return (<InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
        ref={infiniteLoaderRef}
    >
        {({onItemsRendered, ref}) => (<FixedSizeList
            height={500}
            itemCount={itemCount}
            onItemsRendered={onItemsRendered}
            itemSize={50}
            ref={ref}
            width={width}
        >
            {Item}
        </FixedSizeList>)}
    </InfiniteLoader>);
}