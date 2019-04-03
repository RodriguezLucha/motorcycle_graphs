const assert = require('assert');

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