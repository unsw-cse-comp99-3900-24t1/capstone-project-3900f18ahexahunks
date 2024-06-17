const fs = require('fs');
// Use get() to access the data
function getData() {
    if (fs.existsSync('./currData.json')) {
      const storedData = fs.readFileSync('./currData.json', { flag: 'r' });
      data = JSON.parse(storedData.toString());
    }
    return data;
}

// Use set(newData) to pass in the entire data object
function setData(newData) {
    data = newData;
    fs.writeFileSync('./currData.json', JSON.stringify(data), { flag: 'w' });
}
  
export { getData, setData };