import * as d3 from 'd3';
import * as topojson from 'topojson';
import {extractLatitudeAndLongitutes} from './utils';
import {drawMap} from './map';
import {drawMetered, drawUnmetered} from './parking_spots';
import {drawLegend} from './legend';
import getProjection from './projection';


let svg = d3.select('svg'),
  height = +svg.attr('height'),
  width = +svg.attr('width');

svg.attr('viewBox', '-550 -550 1100 1000');

let projection = getProjection(width, height);
let path = d3.geoPath().projection(projection);

let promises = [
  d3.json('data/sf.json'),
  d3.csv('data/metered.csv'),
  d3.json('data/unmetered.json'),
];

Promise.all(promises).then(ready);

function ready([sf, metered, unmetered]) {
  //Load map data
  let precincts = topojson.feature(sf, sf.objects.precinct);

  //Load parking spot data
  let [metered_coordinates, unmetered_coordinates] = extractLatitudeAndLongitutes(metered, unmetered);

  drawMap(svg, precincts, path);
  drawMetered(metered_coordinates, projection);
  drawUnmetered(unmetered_coordinates, projection);
  drawLegend();
}