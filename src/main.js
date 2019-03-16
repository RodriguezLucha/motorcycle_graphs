import * as d3 from 'd3';
import * as topojson from 'topojson';
import {
  parseGeoString
} from './utils';


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

  let i = 0;
  let num_metered_coordinates = metered_coordinates.length;

  let t = d3.interval(() => {
    let d = metered_coordinates[i];

    d3.select('g')
      .append('circle')
      .attr('cx', Math.floor(Math.random() * 1100) -550)
      .attr('cy', -550)
      .attr('r', 5.0)
      .attr('class', 'metered')
      .transition()
      .duration(500)
      .attr('cx', projection([d[1], d[0]])[0])
      .attr('cy', projection([d[1], d[0]])[1])
      .transition()
      .duration(1000)
      .attr('r', 3.0);

    i = i + 1;

    if (i == num_metered_coordinates) {
      t.stop();
    }
  }, 1);

  let j = 0;
  let num_unmetered_coordinates = unmetered_coordinates.length;

  let t2 = d3.interval(() => {
    let du = unmetered_coordinates[j];

    d3.select('g')
      .append('circle')
      .attr('cx', Math.floor(Math.random() * 1100) - 550)
      .attr('cy', -550)
      .attr('r', 5.0)
      .attr('class', 'unmetered')
      .transition()
      .duration(500)
      .attr('cx', projection([du[1], du[0]])[0])
      .attr('cy', projection([du[1], du[0]])[1])
      .transition()
      .duration(1000)
      .attr('r', 3.0);

    j = j + 1;

    if (j == num_unmetered_coordinates) {
      t2.stop();
    }
  }, 1);

  // for (var i = 0; i < m && --n >= 0; ++i) {
  //   var circle = newCircle(k);

  //   svg.append("circle")
  //     .attr("cx", circle[0])
  //     .attr("cy", circle[1])
  //     .attr("r", 0)
  //     .style("fill-opacity", (Math.random() + .5) / 2)
  //     .transition()
  //     .attr("r", circle[2]);

  //   // As we add more circles, generate more candidates per circle.
  //   // Since this takes more effort, gradually reduce circles per frame.
  //   if (k < 500) k *= 1.01, m *= .998;
  // }

  //Unmetered
  // d3.select('g')
  //   .selectAll('unmetered')
  //   .data(unmetered_coordinates)
  //   .enter()
  //   .append('circle')
  //   .attr('r', 1.5)
  //   .attr('class', 'unmetered')
  //   .attr('cx', (d) => projection([d[1], d[0]])[0])
  //   .attr('cy', (d) => projection([d[1], d[0]])[1]);

  //Metered
  // d3.select('g')
  //   .selectAll('metered')
  //   .data(metered_coordinates)
  //   .enter()
  //   .append('circle')
  //   .attr('r', 1.5)
  //   .attr('class', 'metered')
  //   .attr('cx', (d) => projection([d[1], d[0]])[0])
  //   .attr('cy', (d) => projection([d[1], d[0]])[1]);
}