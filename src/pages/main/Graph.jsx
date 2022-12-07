import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchAddAttempt, fetchAttemptsWithOffset} from "../../redux/attempts/actions.js";

function getCssColor(name) {
    return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(name);
}

function Graph({attempts, r, addAttempt, fetchAttemptsWithOffset}) {
    const canvasRef = React.useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        drawCanvasGraph(canvas, ctx, attempts, r, addAttempt);

    });

    useEffect(() => {
        fetchAttemptsWithOffset(-10, 10);
    }, []);

    return (<div className="gradient-animation-box">
        <canvas id="graph" width="390" height="390" ref={canvasRef} className="gradient-animation-box__graph"/>
    </div>)
}


/**
 * Low level function to draw graph on canvas
 * @param canvas
 * @param ctx
 * @param dotsList
 * @param userSelectedR
 */
function drawCanvasGraph(canvas, ctx, dotsList, userSelectedR, addAttempt) {
    /* Init graph parameters */
    const markLen = 20
    const arrowDifference = 20
    const bgColor = getCssColor("--secondary-background")
    const labelsColor = getCssColor("--secondary-text")
    const axisColor = getCssColor("--primary-text")
    const areasColor = getCssColor("--areas-color")

    const hitDotColor = getCssColor("--hit-dot-color")
    const missDotColor = getCssColor("--miss-dot-color")


    /* Init html canvas element */
    const width = canvas.width;
    const height = canvas.height;
    const rValue = width / 2.5

    /* Draw the graph */
    drawGraph()

    /**
     * This method should be used to convert local canvas x value
     * to a correct math x value of the graph using the R value
     */
    function convertXToCanvasCoordinate(x, r, canvasR) {
        return (x / r * canvasR + width / 2);
    }

    /**
     * This method should be used to convert local canvas y value
     * to a correct math x value of the graph using the R value
     */
    function convertYToCanvasCoordinate(y, r, canvasR) {
        return (-y / r * canvasR + height / 2);
    }

    function drawDots() {
        for (let i = 0; i < dotsList.length; i++) {
            const xElement = dotsList[i].x;
            const yElement = dotsList[i].y;
            const rElement = dotsList[i].r;
            const x = convertXToCanvasCoordinate(xElement * userSelectedR / rElement, rElement, rValue * userSelectedR / rElement);
            const y = convertYToCanvasCoordinate(yElement * userSelectedR / rElement, rElement, rValue * userSelectedR / rElement);
            if (dotsList[i].result) {
                ctx.fillStyle = hitDotColor
            } else {
                ctx.fillStyle = missDotColor
            }
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    /* The following functions should only be used inside the drawGraph() */
    function drawHorizontalMarks() {
        ctx.strokeStyle = axisColor;
        ctx.beginPath();

        ctx.fillStyle = labelsColor;

        ctx.fillText("R/2", width / 2 + rValue / 2, height / 2 - markLen - markLen / 2);
        ctx.moveTo(width / 2 + rValue / 2, height / 2 + markLen);
        ctx.lineTo(width / 2 + rValue / 2, height / 2 - markLen);

        ctx.fillText("-R/2", width / 2 - rValue / 2, height / 2 - markLen - markLen / 2);
        ctx.moveTo(width / 2 - rValue / 2, height / 2 + markLen);
        ctx.lineTo(width / 2 - rValue / 2, height / 2 - markLen);

        ctx.fillText("R", width / 2 + rValue, height / 2 - markLen - markLen / 2);
        ctx.moveTo(width / 2 + rValue, height / 2 + markLen);
        ctx.lineTo(width / 2 + rValue, height / 2 - markLen);

        ctx.fillText("-R", width / 2 - rValue, height / 2 - markLen - markLen / 2);
        ctx.moveTo(width / 2 - rValue, height / 2 + markLen);
        ctx.lineTo(width / 2 - rValue, height / 2 - markLen);

        ctx.stroke();
    }

    function drawVerticalMarks() {
        ctx.strokeStyle = axisColor;
        ctx.beginPath();

        ctx.fillStyle = labelsColor;

        ctx.fillText("-R/2", width / 2 + markLen + markLen / 2, height / 2 + rValue / 2);
        ctx.moveTo(width / 2 + markLen, height / 2 + rValue / 2);
        ctx.lineTo(width / 2 - markLen, height / 2 + rValue / 2);

        ctx.fillText("R/2", width / 2 + markLen + markLen / 2, height / 2 - rValue / 2);
        ctx.moveTo(width / 2 + markLen, height / 2 - rValue / 2);
        ctx.lineTo(width / 2 - markLen, height / 2 - rValue / 2);

        ctx.fillText("-R", width / 2 + markLen + markLen / 2, height / 2 + rValue);
        ctx.moveTo(width / 2 + markLen, height / 2 + rValue);
        ctx.lineTo(width / 2 - markLen, height / 2 + rValue);

        ctx.fillText("R", width / 2 + markLen + markLen / 2, height / 2 - rValue);
        ctx.moveTo(width / 2 + markLen, height / 2 - rValue);
        ctx.lineTo(width / 2 - markLen, height / 2 - rValue);

        ctx.stroke();
    }

    function drawTriangle() {
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(width / 2 + rValue / 2, height / 2);
        ctx.lineTo(width / 2, height / 2 + rValue);
        ctx.fill();
    }

    function drawSector() {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, rValue, Math.PI / 2, Math.PI, false);
        ctx.lineTo(width / 2, height / 2);
        ctx.fill();
    }

    function drawRectangle() {
        ctx.beginPath();
        ctx.fillRect(width / 2, height / 2, -rValue / 2, -rValue);
        ctx.fill();
    }

    function drawAreas() {
        ctx.fillStyle = areasColor;
        drawTriangle();
        drawSector();
        drawRectangle();
    }

    function drawHorizontalAxis() {
        ctx.strokeStyle = axisColor;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.lineTo(width - arrowDifference, height / 2 - arrowDifference);
        ctx.moveTo(width, height / 2);
        ctx.lineTo(width - arrowDifference, height / 2 + arrowDifference);
        ctx.stroke();
    }

    function drawVerticalAxis() {
        ctx.strokeStyle = axisColor;
        ctx.beginPath();
        ctx.moveTo(width / 2, height);
        ctx.lineTo(width / 2, 0);
        ctx.lineTo(width / 2 - arrowDifference, arrowDifference);
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2 + arrowDifference, arrowDifference);
        ctx.stroke();
    }

    /**
     * Fully re-draws the graph above current canvas.
     */
    function drawGraph() {
        ctx.fillStyle = bgColor;
        ctx.clearRect(0, 0, width, height);
        ctx.fillRect(0, 0, width, height);

        drawAreas();

        drawHorizontalMarks();
        drawVerticalMarks();

        drawHorizontalAxis();
        drawVerticalAxis();

        drawDots()
    }

    /**
     * This method should be used to convert local canvas x value
     * to a correct math x value of the graph using the R value
     */
    function convertXToRadiusOf(x, r) {
        return ((x - width / 2) / rValue) * r;
    }

    /**
     * This method should be used to convert local canvas y value
     * to a correct math x value of the graph using the R value
     */
    function convertYToRadiusOf(y, r) {
        return ((height - y - height / 2) / rValue) * r;
    }

    canvas.onmousedown = function (event) {

        const x = convertXToRadiusOf(event.offsetX, userSelectedR);
        const y = convertYToRadiusOf(event.offsetY, userSelectedR);

        addAttempt({x: x, y: y, r: userSelectedR});
    };
}

function mapDispatchToGraphProps(dispatch) {
    return {
        addAttempt: (attempt) => dispatch(fetchAddAttempt(attempt)),
        fetchAttemptsWithOffset: (offset, limit) => dispatch(fetchAttemptsWithOffset(offset, limit)),
    }
}

function mapStateToGraphProps(state) {
    return {
        attempts: state.attemptsList, r: state.currentEnteredR
    }
}

export default connect(mapStateToGraphProps, mapDispatchToGraphProps)(Graph);