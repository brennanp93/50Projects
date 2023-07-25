function handleCSV() {
  const fileInput = document.getElementById('csvFileInput');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const csvData = event.target.result;
      processData(csvData);
    };

    reader.readAsText(file);
  }
}

function processData(csvData) {
  // Here, you can parse and process the CSV data
  const rows = csvData.split('\n');
  const data = rows.map(row => row.split(','));
  console.log(data);
}
