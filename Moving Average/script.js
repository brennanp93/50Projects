import { stockData } from "./data.js";
const canvas = document.getElementById("canvasId");
const ctx = canvas.getContext("2d");
const heightRatio = 0.5;
canvas.height = canvas.width * heightRatio;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const MA_PERIOD = 20;
const DAYS_TO_DISPLAY = 30;

/**
 * Calculates the 20-day Moving Average of stock closing prices.
 *
 * @param {Object[]} stockData - The array of stock data objects, each containing 'Date' and 'closingPrice'.
 * @param {number} currentIdx - The index of the current data point for which to calculate the Moving Average.
 * @returns {number} The calculated 20-day Moving Average.
 */
function calculateMovingAverage(stockData, currentIdx) {
  let sum = 0;
  for (let i = currentIdx - MA_PERIOD + 1; i <= currentIdx; i++) {
    sum += stockData[i].closingPrice;
  }
  return sum / MA_PERIOD;
}
/**
 * Draws grid lines on the canvas representing the x and y axis.
 * The x-axis grid lines represent 30 days of data, and the y-axis grid lines are evenly spaced.
 */
function drawGridLines() {
  const intervalY = canvasWidth / (DAYS_TO_DISPLAY - 1);
  const intervalX = canvasHeight / 10;
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;
  for (let i = 0; i < canvasWidth; i += intervalY) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvasHeight);
    ctx.stroke();
  }
  for (let i = 0; i < canvasHeight; i += intervalX) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvasWidth, i);
    ctx.stroke();
  }
}
/**
 * Generates an array of closing prices.
 */
const closingPrices = stockData.map((daily) => daily.closingPrice);
/**
 * stores the highest and lowest closingPrices of the data to be used in calculating the scale of the chart
 */
const maxPrice = Math.max(...closingPrices);
const minPrice = Math.min(...closingPrices);
const startIdx = stockData.length - DAYS_TO_DISPLAY;
/**
 * Helper function to calculate the x coordinate for the drawMovingAverage and drawDataPoints functions
 *
 * @param {number} i - The current index.
 * @param {number} startIdx - Index that is 30 elements from the last index to represent 30 days of data.
 * @param {number} canvasWidth - Width of the canvas in pixels
 * @returns {number} The calculated x coordinate.
 */
function calculateXCoordinate(i, startIdx, canvasWidth) {
  return (i - startIdx) * (canvasWidth / (DAYS_TO_DISPLAY - 1));
}

/**
 * Helper function to calculate the y coordinate for the drawMovingAverage function
 *
 * @param {number} ma - Moving average calculated by the calculateMovingAverage function
 * @param {number} minPrice - Mininum price of the entire stockData used to scale the chart
 * @param {number} maxPrice - Maximum price of the entire stockData used to scale the chart
 * @param {number} canvasHeight - Height of the canvas in pixels
 * @returns {number} The calculated y coordinate.
 */
function calculateYCoordinate(ma, minPrice, maxPrice, canvasHeight) {
  return (
    canvasHeight +
    100 -
    ((ma - minPrice) / (maxPrice - minPrice)) * canvasHeight
  );
}

/**
 * Draws a line across the chart to indicate the 20-day Moving Average of the stock price
 *
 * @param {Object[]} stockData - Stock data which includes 'Date' and 'closingPrice'.
 */
function drawMovingAverage(stockData) {
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  for (let i = startIdx; i < stockData.length; i++) {
    const ma = calculateMovingAverage(stockData, i);
    const x = calculateXCoordinate(i, startIdx, canvasWidth);
    const y = calculateYCoordinate(ma, minPrice, maxPrice, canvasHeight);
    if (i === startIdx) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}
/**
 * Plots the 30 most recent data points on the chart.
 *
 * @param {Object[]} stockData - Stock data which includes 'Date' and 'closingPrice'.
 */
function drawDataPoints(stockData) {
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 1;

  for (let i = startIdx; i < stockData.length; i++) {
    const x = calculateXCoordinate(i, startIdx, canvasWidth);
    const y =
      canvasHeight +
      100 -
      ((stockData[i].closingPrice - minPrice) / (maxPrice - minPrice)) *
        canvasHeight;

    //Data Points & Lines
    ctx.lineTo(x, y);
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    // White Box Behind Text
    ctx.fillStyle = "white";
    ctx.fillRect(x, y - 3, 41, -20);
    // Text - Closing Price
    ctx.fillStyle = "black";
    ctx.font = "Bold 13px Arial";
    ctx.fillText(stockData[i].closingPrice, x, y - 7);
    // Text - Date
    ctx.font = " Bold 12px Arial";
    ctx.fillText(stockData[i].Date, x + 2, canvasHeight - 1);
    ctx.stroke();
  }
}
// Draws the chart components
drawGridLines();
drawMovingAverage(stockData);
drawDataPoints(stockData);
