import * as d3 from 'd3';

export default (width, height) => d3.geoMercator()
  .center([-122.433701, 37.767683])
  .scale(291000)
  .translate([width / 2, height / 2]);