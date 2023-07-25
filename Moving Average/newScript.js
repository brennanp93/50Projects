const stockData = [
  { Date: "5/10", closingPrice: 122.02 },
  { Date: "5/11", closingPrice: 120.9 },
  { Date: "5/12", closingPrice: 122.84 },
  { Date: "5/15", closingPrice: 123.36 },
  { Date: "5/16", closingPrice: 123.46 },
  { Date: "5/17", closingPrice: 125.71 },
  { Date: "5/18", closingPrice: 126.15 },
  { Date: "5/19", closingPrice: 127.26 },
  { Date: "5/22", closingPrice: 127.5 },
  { Date: "5/23", closingPrice: 128.18 },
  { Date: "5/24", closingPrice: 125.68 },
  { Date: "5/25", closingPrice: 126.76 },
  { Date: "5/26", closingPrice: 128.89 },
  { Date: "5/30", closingPrice: 129.48 },
  { Date: "5/31", closingPrice: 128.59 },
  { Date: "6/1", closingPrice: 129.82 },
  { Date: "6/2", closingPrice: 132.42 },
  { Date: "6/5", closingPrice: 132.64 },
  { Date: "6/6", closingPrice: 132.69 },
  { Date: "6/7", closingPrice: 134.38 },
  { Date: "6/8", closingPrice: 134.41 },
  { Date: "6/9", closingPrice: 135.3 },
  { Date: "6/12", closingPrice: 136.42 },
  { Date: "6/13", closingPrice: 137.6 },
  { Date: "6/14", closingPrice: 137.2 },
  { Date: "6/15", closingPrice: 138.4 },
  { Date: "6/16", closingPrice: 137.48 },
  { Date: "6/20", closingPrice: 135.96 },
  { Date: "6/21", closingPrice: 133.69 },
  { Date: "6/22", closingPrice: 131.17 },
  { Date: "6/23", closingPrice: 129.43 },
  { Date: "6/26", closingPrice: 131.34 },
  { Date: "6/27", closingPrice: 132.34 },
  { Date: "6/28", closingPrice: 131.76 },
  { Date: "6/29", closingPrice: 134.06 },
  { Date: "6/30", closingPrice: 133.81 },
  { Date: "7/3", closingPrice: 133.67 },
  { Date: "7/5", closingPrice: 134.24 },
  { Date: "7/6", closingPrice: 132.16 },
  { Date: "7/7", closingPrice: 132.08 },
  { Date: "7/10", closingPrice: 132.9 },
  { Date: "7/11", closingPrice: 134.44 },
  { Date: "7/12", closingPrice: 132.84 },
  { Date: "7/13", closingPrice: 133.92 },
  { Date: "7/14", closingPrice: 133.4 },
  { Date: "7/17", closingPrice: 134.24 },
  { Date: "7/18", closingPrice: 135.36 },
  { Date: "7/19", closingPrice: 135.48 },
  { Date: "7/20", closingPrice: 138.38 },
  { Date: "7/21", closingPrice: 138.94 },
  { Date: "7/24", closingPrice: 139.54 },
];

function calculateMovingAverage(stockData, currentIndex) {
  let sum = 0;
  for (let i = currentIndex - 19; i <= currentIndex; i++) {
    sum += stockData[i].closingPrice;
  }

  return sum / 20;
}

const canvas = document.getElementById("stockCanvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

function gridLines() {
  const intervalY = canvasWidth / 29;
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

// Find the maximum and minimum closing prices to scale the chart
const closingPrices = stockData.map((data) => data.closingPrice);
const maxPrice = Math.max(...closingPrices);
const minPrice = Math.min(...closingPrices);
const startIdx = stockData.length - 30;

function calculateXCoordinate(i, startIdx, canvasWidth) {
  return (i - startIdx) * (canvasWidth / 29);
}

function calculateYCoordinate(ma, minPrice, maxPrice, canvasHeight) {
  return (
    canvasHeight +
    100 -
    ((ma - minPrice) / (maxPrice - minPrice)) * canvasHeight
  );
}
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
    ctx.font = " Bold 10px Arial";
    ctx.fillText(stockData[i].Date, x, 597);
    ctx.stroke();
  }
}

drawMovingAverage(stockData);
drawDataPoints(stockData);
gridLines();
