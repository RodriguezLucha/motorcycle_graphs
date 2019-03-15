import * as d3 from 'd3';
import * as topojson from 'topojson';

let svg = d3.select('svg'),
  width = +svg.attr('width');

let projection = d3.geoMercator()
  .center([-122.433701, 37.767683])
  .scale(211000)
  .translate([width / 2, 310]);

let path = d3.geoPath()
  .projection(projection);

let promises = [d3.json('data/sf.json')];
Promise.all(promises).then(ready);

function ready([us]) {
  let precincts = topojson.feature(us, us.objects.precinct);

  svg.append('g')
    .attr('class', 'precinct')
    .selectAll('path')
    .data(precincts.features)
    .enter()
    .append('path')
    .attr('d', path);
}