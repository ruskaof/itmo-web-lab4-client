import React, {useEffect, useRef} from "react";
import {fetchAttempts, fetchAttemptsWithOffset} from "../redux/attempts/actions.js";
import {connect} from "react-redux";

function BigDataTable({rows, fetchAttempts, rowHeight, visibleRowsCount, nRows, offset, fetchAttemptsWithOffset}) {
    rowHeight = rowHeight || 80;
    visibleRowsCount = visibleRowsCount || 6;
    const [start, setStart] = React.useState(0); // TODO: use redux to update start when some rows are deleted

    function getTopHeight() {
        return rowHeight * start;
    }

    function getBottomHeight() {
        return rowHeight * (nRows - start - visibleRowsCount - 1);
    }

    useEffect(() => {
        fetchAttemptsWithOffset(0, visibleRowsCount * 2);
    }, [])

    const rootRef = useRef()

    useEffect(() => {
        rootRef.current.addEventListener('scroll', onScroll)

        return () => {
            rootRef.current.removeEventListener('scroll', onScroll)
        }
    }, [rows, visibleRowsCount, rowHeight])

    function onScroll(e) {
        const newStart = Math.min(rows.length - visibleRowsCount - 1, Math.floor((e.target.scrollTop < 0 ? 0 : e.target.scrollTop) / rowHeight))

        console.log("newStart + visibleRowsCount + 1 = " + (newStart + visibleRowsCount + 1), "rows.length = " + rows.length);
        if (newStart + visibleRowsCount + 1 >= rows.length) {
            console.log("fetching more attempts");
            fetchAttemptsWithOffset(0, (newStart + visibleRowsCount) * 2);
        }

        setStart(newStart);

    }


    return (<div>

        <div style={{
            height: rowHeight * visibleRowsCount + 1,
            width: '50%',
            overflow: "auto",
            color: "white",
            border: "1px solid red"
        }} ref={rootRef}>

            <div style={{
                height: rows.length >= visibleRowsCount ? getTopHeight() : 0
            }}></div>
            <table>
                {/*<thead>*/}
                {/*<tr style={{height: rowHeight}}>*/}
                {/*    <th>№</th>*/}
                {/*    <th>Attempt Time</th>*/}
                {/*    <th>Attempt Result</th>*/}
                {/*    <th>Process time</th>*/}
                {/*    <th>X</th>*/}
                {/*    <th>Y</th>*/}
                {/*    <th>R</th>*/}
                {/*</tr>*/}
                {/*</thead>*/}
                <tbody>
                {rows.slice(start, start + visibleRowsCount + 1)
                    .map(({
                              attemptTime, id, processingTimeNanos, r, result, x, y
                          }, index) => (<tr
                        key={id}
                        style={{height: rowHeight}}
                    >
                        <td key={id * 10 + ' ' + 1}>{id}</td>
                        <td key={id * 10 + ' ' + 2}>{attemptTime}</td>
                        <td key={id * 10 + ' ' + 3}>{result ? "hit" : "miss"}</td>
                        <td key={id * 10 + ' ' + 4}>{processingTimeNanos}</td>
                        <td key={id * 10 + ' ' + 5}>{x}</td>
                        <td key={id * 10 + ' ' + 6}>{y}</td>
                        <td key={id * 10 + ' ' + 7}>{r}</td>
                    </tr>))}
                </tbody>
            </table>
            <div style={{
                height: getBottomHeight()
            }}></div>
        </div>
    </div>);
}

function mapStateToTableProps(state) {
    return {
        rows: state.attemptsList, nRows: state.nRows, offset: state.offset
    }
}

function mapDispatchToTableProps(dispatch) {
    return {
        fetchAttempts: () => {
            console.log("fetching attempts from table"); // TODO: remove logs
            dispatch(fetchAttempts())
        }, fetchAttemptsWithOffset: (offset, count) => {
            console.log("fetching attempts from table"); // TODO: remove logs
            dispatch(fetchAttemptsWithOffset(offset, count))
        }
    }
}

export default connect(mapStateToTableProps, mapDispatchToTableProps)(BigDataTable)