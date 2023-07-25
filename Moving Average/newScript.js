const stockData = [
  // V False Data to scale the graph V //
  // { Date: "May 10, 2023", closingPrice: 150.02 },
  // ^ False Data to scale the graph ^ //
  { Date: "Jun 1, 2023", closingPrice: 129.82 },
  { Date: "Jun 2, 2023", closingPrice: 132.42 },
  { Date: "Jun 5, 2023", closingPrice: 132.64 },
  { Date: "Jun 6, 2023", closingPrice: 132.69 },
  { Date: "Jun 7, 2023", closingPrice: 134.38 },
  { Date: "Jun 8, 2023", closingPrice: 134.41 },
  { Date: "Jun 9, 2023", closingPrice: 135.3 },
  { Date: "May 10, 2023", closingPrice: 122.02 },
  { Date: "May 11, 2023", closingPrice: 120.9 },
  { Date: "May 12, 2023", closingPrice: 122.84 },
  { Date: "May 15, 2023", closingPrice: 123.36 },
  { Date: "May 16, 2023", closingPrice: 123.46 },
  { Date: "May 17, 2023", closingPrice: 125.71 },
  { Date: "May 18, 2023", closingPrice: 126.15 },
  { Date: "May 19, 2023", closingPrice: 127.26 },
  { Date: "May 22, 2023", closingPrice: 127.5 },
  { Date: "May 23, 2023", closingPrice: 128.18 },
  { Date: "May 24, 2023", closingPrice: 125.68 },
  { Date: "May 25, 2023", closingPrice: 126.76 },
  { Date: "May 26, 2023", closingPrice: 128.89 },
  { Date: "May 30, 2023", closingPrice: 129.48 },
  { Date: "May 31, 2023", closingPrice: 128.59 },
  { Date: "Jun 1, 2023", closingPrice: 129.82 },
  { Date: "Jun 2, 2023", closingPrice: 132.42 },
  { Date: "Jun 5, 2023", closingPrice: 132.64 },
  { Date: "Jun 6, 2023", closingPrice: 132.69 },
  { Date: "Jun 7, 2023", closingPrice: 134.38 },
  { Date: "Jun 8, 2023", closingPrice: 134.41 },
  { Date: "Jun 9, 2023", closingPrice: 135.3 },
  { Date: "Jun 12, 2023", closingPrice: 136.42 },
  { Date: "Jun 13, 2023", closingPrice: 137.6 },
  { Date: "Jun 14, 2023", closingPrice: 137.2 },
  { Date: "Jun 15, 2023", closingPrice: 138.4 },
  { Date: "Jun 16, 2023", closingPrice: 137.48 },
  { Date: "Jun 20, 2023", closingPrice: 135.96 },
  { Date: "Jun 21, 2023", closingPrice: 133.69 },
  { Date: "Jun 22, 2023", closingPrice: 131.17 },
  { Date: "Jun 23, 2023", closingPrice: 129.43 },
  { Date: "Jun 26, 2023", closingPrice: 131.34 },
  { Date: "Jun 27, 2023", closingPrice: 132.34 },
  { Date: "Jun 28, 2023", closingPrice: 131.76 },
  { Date: "Jun 29, 2023", closingPrice: 134.06 },
  { Date: "Jun 30, 2023", closingPrice: 133.81 },
  { Date: "Jul 3, 2023", closingPrice: 133.67 },
  { Date: "Jul 5, 2023", closingPrice: 134.24 },
  { Date: "Jul 6, 2023", closingPrice: 132.16 },
  { Date: "Jul 7, 2023", closingPrice: 132.08 },
  { Date: "Jul 10, 2023", closingPrice: 132.9 },
  { Date: "Jul 11, 2023", closingPrice: 134.44 },
  { Date: "Jul 12, 2023", closingPrice: 132.84 },
  { Date: "Jul 13, 2023", closingPrice: 133.92 },
  { Date: "Jul 14, 2023", closingPrice: 133.4 },
  { Date: "Jul 17, 2023", closingPrice: 134.24 },
  { Date: "Jul 18, 2023", closingPrice: 135.36 },
  { Date: "Jul 19, 2023", closingPrice: 135.48 },
  { Date: "Jul 20, 2023", closingPrice: 138.38 },
  { Date: "Jul 21, 2023", closingPrice: 138.94 },
  { Date: "Jul 24, 2023", closingPrice: 139.16 },
];
// let stockData = stockData1.reverse();

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

function drawStockChart(stockData) {
  // Find the maximum and minimum closing prices to scale the chart
  const closingPrices = stockData.map((data) => data.closingPrice);
  const maxPrice = Math.max(...closingPrices);
  const minPrice = Math.min(...closingPrices);

  // Clear the canvas and start drawing
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // Y Axis Lines
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const interval = canvasWidth / 29;
  for (let i = 0; i < canvasWidth; i += interval) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvasHeight);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "Bold 13px Arial";
    ctx.fillText(Math.round(i / interval + 1).toString(), i, canvasHeight);
  }

  // X Axis lines
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const intervalX = canvasHeight / 10;
  for (let i = 0; i < canvasHeight; i += intervalX) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvasWidth, i);
  }
  ctx.stroke();

  // Draw the 20-day moving average
  const startIdx = stockData.length - 30;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.beginPath();

  for (let i = startIdx; i < stockData.length; i++) {
    const ma = calculateMovingAverage(stockData, i);
    // console.log(ma)
    // if (ma !== null) {
    const x = (i - startIdx) * (canvasWidth / 29);
    const y =
      canvasHeight +
      100 -
      ((ma - minPrice) / (maxPrice - minPrice)) * canvasHeight;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    // }
  }
  ctx.stroke();

  // Draw the stock data
  ctx.beginPath();
  for (let i = startIdx; i < stockData.length; i++) {
    const x = (i - startIdx) * (canvasWidth / 29);
    const y =
      canvasHeight +
      100 -
      ((stockData[i].closingPrice - minPrice) / (maxPrice - minPrice)) *
        canvasHeight;
    //Create a line and label each data point

    // Properties
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillStyle = "white";
    ctx.font = "Bold 13px Arial";
    // Elements
    ctx.lineTo(x, y);
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fillRect(x, y - 3, 41, -20);
    ctx.fillStyle = "black";
    ctx.fillText(stockData[i].closingPrice, x, y - 7);
  }
  ctx.stroke();

  // Adding Text To Canvas
  ctx.fillStyle = "black";
  ctx.font = "Bold 18px Arial";
  ctx.fillText("Date (30 days ago)", 10, canvas.height - 15);
  ctx.fillText("Date (Today)", canvas.width - 115, canvas.height - 15);
  // ctx.fillText("Closing Price", 10, 15);
  ctx.textAlign = "center";
  ctx.fillText("Stock Price Graph", canvas.width / 2, 30);
}

drawStockChart(stockData);
