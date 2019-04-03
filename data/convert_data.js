
const keys = require('./config/keys');
const axios = require('axios');

async function main() {
  handleMeteredData();
  handleUnmeteredData();
}

//handle metered data
async function handleMeteredData() {
  let input = './metered_stripped.json';
  let output = './metered_cleaned.json';

  let data = readJSONFromFile(input);
  let spots = [];
  for (let i = 0; i < data.length; i++) {
    // for (let i = 0; i < 2; i++) {
    const coordinate = data[i];
    let lat = coordinate[0];
    let lng = coordinate[1];
    let address = await reverseGeocode(lat, lng);
    if (address !== '') {
      let spot = {lat, lng, address};
      spots.push(spot);
    }
  }
  writeJSONToFile(output, spots);
}

//handle unmetered data
async function handleUnmeteredData() {
  let input = './unmetered.json';
  let output = './unmetered_cleaned.json';

  let data = readJSONFromFile(input);
  data = data.features;
  let spots = [];

  // for (let i = 0; i < 2; i++) {
  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    let gps = e.geometry.coordinates;
    let lng = gps[0];
    let lat = gps[1];
    let address = await reverseGeocode(lat, lng);
    if (address !== '') {
      let spot = {lat, lng, address};
      spots.push(spot);
    }
  }

  writeJSONToFile(output, spots);
}

function readJSONFromFile(filename) {
  const fs = require('fs');
  const contents = fs.readFileSync(filename);
  return JSON.parse(contents);
}
function writeJSONToFile(filename, data) {
  const fs = require('fs');
  let outputJSON = JSON.stringify(data);
  fs.writeFile(filename, outputJSON, 'utf8', () => 0);
}

async function reverseGeocode(lat, lng) {
  let googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${keys.googleAPI}`;
  let address = await fetchAddress(googleUrl);
  return address;
}

async function fetchAddress(url) {
  console.log(url);
  let result = await axios.get(url)
    .then(response => response.data.results[0].formatted_address)
    .catch(() => {
      console.log(`Error at ${url}`);
      return null;
    });
  return result;
}

main();