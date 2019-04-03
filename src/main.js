import * as d3 from 'd3';
import d3Tip from 'd3-tip';

import * as topojson from 'topojson';
import {extractData} from './utils';
import {drawMap} from './map';
import {drawMetered, drawUnmetered} from './parking_spots';
import {setupZoom} from './zoom';
import getProjection from './projection';


let svg = d3.select('svg'),
  height = +svg.attr('height'),
  width = +svg.attr('width');

svg.attr('viewBox', '-550 -550 1100 1000');

let projection = getProjection(width, height);
let path = d3.geoPath().projection(projection);

// Zoom
let clicked = setupZoom(projection, width, height, svg);

// Tooltip
let tip = d3Tip().attr('class', 'd3-tip').html((d) => d.address);
svg.call(tip);


let promises = [
  d3.json('data/sf.json'),
  d3.json('data/metered_cleaned.json'),
  d3.json('data/unmetered_cleaned.json'),
];

Promise.all(promises).then(ready);

function ready([sf, metered, unmetered]) {
  //Load map data
  let precincts = topojson.feature(sf, sf.objects.precinct);

  //Load parking spot data

  drawMap(svg, precincts, path, clicked);
  drawMetered(metered, projection, tip);
  drawUnmetered(unmetered, projection, tip);
}

