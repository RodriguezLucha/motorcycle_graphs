import * as d3 from 'd3';
import * as topojson from 'topojson';
import {parseGeoString} from './utils';


let svg = d3.select('svg'),
  height = +svg.attr('height'),
  width = +svg.attr('width');

svg.attr('viewBox', '-550 -550 1100 1000');

let projection = d3.geoMercator()
  .center([-122.433701, 37.767683])
  .scale(291000)
  .translate([width / 2, height / 2]);

let path = d3.geoPath()
  .projection(projection);

let promises = [
  d3.json('data/sf.json'),
  d3.csv('data/metered.csv'),
  d3.json('data/unmetered.json'),
];
Promise.all(promises).then(ready);

function ready([sf, metered, unmetered]) {
  let precincts = topojson.feature(sf, sf.objects.precinct);

  let metered_coordinates = metered.map(e => {
    let gpsStr = e['Location'];
    let gps = parseGeoString(gpsStr);
    let lat = gps[0];
    let lng = gps[1];
    let coordinates = [lat, lng];
    return coordinates;
  });

  let unmetered_coordinates = unmetered.features.map(e => {
    let gps = e.geometry.coordinates;
    let lat = gps[1];
    let lng = gps[0];
    let coordinates = [lat, lng];
    return coordinates;
  });


  //Map
  svg.append('g')
    .attr('class', 'precinct')
    .selectAll('path')
    .data(precincts.features)
    .enter()
    .append('path')
    .attr('d', path);

  //Unmetered
  d3.select('g')
    .selectAll('unmetered')
    .data(unmetered_coordinates)
    .enter()
    .append('circle')
    .attr('r', 1.5)
    .attr('class', 'unmetered')
    .attr('cx', (d) => projection([d[1], d[0]])[0])
    .attr('cy', (d) => projection([d[1], d[0]])[1]);

  //Metered
  d3.select('g')
    .selectAll('metered')
    .data(metered_coordinates)
    .enter()
    .append('circle')
    .attr('r', 1.5)
    .attr('class', 'metered')
    .attr('cx', (d) => projection([d[1], d[0]])[0])
    .attr('cy', (d) => projection([d[1], d[0]])[1]);
}