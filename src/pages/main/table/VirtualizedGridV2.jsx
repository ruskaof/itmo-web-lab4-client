import React from "@types/react";
import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList} from "react-window";

function ExampleWrapper({
                            hasNextPage,
                            isNextPageLoading,
                            items,
                            loadNextPage
                        }) {
    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const itemCount = hasNextPage ? items.length + 1 : items.length;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreItems = isNextPageLoading ? () => {
    } : loadNextPage;

    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = index => !hasNextPage || index < items.length;

    // Render an item or a loading indicator.
    const Item = ({index, style}) => {
        let content;
        if (!isItemLoaded(index)) {
            return <div style={style}>Loading...</div>;
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

    };

    return (<InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
    >
        {({onItemsRendered, ref}) => (<FixedSizeList
            itemCount={itemCount}
            onItemsRendered={onItemsRendered}
            ref={ref}
        >
            {Item}
        </FixedSizeList>)}
    </InfiniteLoader>);
}