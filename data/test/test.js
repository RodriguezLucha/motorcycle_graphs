const assert = require('assert');
const keys = require('../config/keys');
const axios = require('axios');
const expect = require('chai').expect;

describe.skip('Array', () => {
  describe('#indexOf ()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
describe('csvToJson', () => {
  describe('csvtojson command line', () => {
    it.skip('should return -1 when the value is not present', () => {
      let cmd = 'npx csvtojson metered.csv > metered_full.json';
    });
  });
});
describe('jsonToCleanedJson', () => {
  it.skip('Convert ', () => {
    const fs = require('fs');
    const contents = fs.readFileSync('metered_full.json');
    let jsonContent = JSON.parse(contents);
    let result = [];
    for (let i = 0; i < jsonContent.length; i++) {
      let input = jsonContent[i].Location;
      let substr = input.slice(input.indexOf('(') + 1, input.indexOf(')'));
      let coordinates = substr.split(', ');
      coordinates = coordinates.map(e => e.split(' '));
      coordinates = coordinates.map(e => +e);
      result.push(coordinates);
    }
    let outputJSON = JSON.stringify(result);
    fs.writeFile('metered_stripped.json', outputJSON, 'utf8', () => 0);
  });
});

async function fetchAddress(url) {
  let result = await axios.get(url)
    .then(response => response.data.results[0].formatted_address);
  return result;
}

describe('Google API Reverse Geo Coding', () => {
  it('Converts GPS coordinates', async () => {
    let coordinates = [40.714224, -73.961452];
    let lat = coordinates[0];
    let lng = coordinates[1];
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${keys.googleAPI}`;

    let result = await fetchAddress(url);
    expect(result).to.be.a('string');
    expect(result).to.equal('279 Bedford Ave, Brooklyn, NY 11211, USA');
  });
});