import React, {useRef} from "react";
import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList} from "react-window";
import {useEffect} from "react";
import {ApplicationService} from "../../../service/ApplicationService.js";
import {connect} from "react-redux";
import {setTableAttemptsList, setTableHasMore} from "../../../redux/attempts/actions.js";

const pageSize = 25;

function VirtualizedGridV2(props) {
    const {
        hasMore,
        setHasMore,
        setAttempts,
        attempts,
        width,
        searchId,
        searchX,
        searchY,
        searchR,
        searchResult,
        searchTime,
        searchProcessingTime
    } = props;

    const infiniteLoaderRef = useRef(null);
    const hasMountedRef = useRef(false);



    const [isNextPageLoading, setIsNextPageLoading] = React.useState(false);

    const itemCount = hasMore ? attempts.length + 1 : attempts.length;

    const loadMoreItems = isNextPageLoading ? () => {
    } : loadNextPage;

    const isItemLoaded = (index) => {
        return !hasMore || index < attempts.length;
    }

    function loadNextPage() {
        setIsNextPageLoading(true);
        return ApplicationService.getAttemptsWithOffset(attempts.length, pageSize, {
            searchId, searchX, searchY, searchR, searchResult, searchTime, searchProcessingTime
        })
            .then(response => response.json())
            .then(data => {
                setAttempts(attempts.concat(data.attempts));
                setHasMore(data.has_more);
                setIsNextPageLoading(false);
            })
    }

    useEffect(() => {
        setIsNextPageLoading(false);
        setHasMore(true);
        if (hasMountedRef.current) {
            if (infiniteLoaderRef.current) {

                infiniteLoaderRef.current.resetloadMoreItemsCache(false);
                loadNextPage()
            }
        }
        hasMountedRef.current = true;

    }, [searchId, searchX, searchY, searchR, searchResult, searchTime, searchProcessingTime])

    const Item = ({index, style}) => {
        if (!isItemLoaded(index)) {
            return <div style={style}>Loading...</div>;
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

function mapStateToTableProps(state) {
    return {
        searchId: state.tableSearchId,
        searchX: state.tableSearchX,
        searchY: state.tableSearchY,
        searchR: state.tableSearchR,
        searchResult: state.tableSearchResult,
        searchTime: state.tableSearchTime,
        searchProcessingTime: state.tableSearchProcessingTime,
        hasMore: state.tableHasMore,
        attempts: state.tableAttemptsList,
    }
}

function mapDispatchToTableProps(dispatch) {
    return {
        setHasMore: (hasMore) => dispatch(setTableHasMore(hasMore)),
        setAttempts: (attempts) => dispatch(setTableAttemptsList(attempts)),
    }
}

export default connect(mapStateToTableProps, mapDispatchToTableProps)(VirtualizedGridV2);