import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {fetchAttempts} from "../redux/attempts/actions.js";
import {connect} from "react-redux";

function MyTable(props) {
    useEffect(() => {
        props.fetchAttempts();
    }, [])

    const rows = props.rows;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Attempt Time</TableCell>
                    <TableCell>Attempt Result</TableCell>
                    <TableCell>Process time</TableCell>
                    <TableCell>X</TableCell>
                    <TableCell>Y</TableCell>
                    <TableCell>R</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(({attemptTime, id, processingTimeNanos, r, result, x, y}) => (
                    <TableRow
                        key={id}
                    >
                        <TableCell>{id}</TableCell>
                        <TableCell>{attemptTime}</TableCell>
                        <TableCell>{result ? "hit" : "miss"}</TableCell>
                        <TableCell>{processingTimeNanos}</TableCell>
                        <TableCell>{x}</TableCell>
                        <TableCell>{y}</TableCell>
                        <TableCell>{r}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function mapStateToTableProps(state) {
    return {
        rows: state.attemptsList
    }
}

function mapDispatchToTableProps(dispatch) {
    return {
        fetchAttempts: () => {
            console.log("fetching attempts from table"); // TODO: remove logs
            dispatch(fetchAttempts())
        }
    }
}

export default connect(mapStateToTableProps, mapDispatchToTableProps)(MyTable)