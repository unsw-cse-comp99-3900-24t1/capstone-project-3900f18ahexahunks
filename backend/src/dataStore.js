const fs = require('fs');

let data = {
  ubls: [],
  pdfs: []
};

// Use getData to access the data
function getData() {
  if (fs.existsSync('./application.json')) {
    const storedData = fs.readFileSync('./application.json', { flag: 'r' });
    data = JSON.parse(storedData.toString());
  }
  return data;
}

// Use setData to pass in the entire data object, with modifications made
function setData(newData) {
  data = newData;
  fs.writeFileSync('./application.json', JSON.stringify(data), { flag: 'w' });
}

export { getData, setData };
