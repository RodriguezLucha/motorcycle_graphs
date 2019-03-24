import * as d3 from 'd3';
import d3Tip from 'd3-tip';

import * as topojson from 'topojson';
import {extractLatitudeAndLongitutes} from './utils';
import {drawMap} from './map';
import {drawMetered, drawUnmetered} from './parking_spots';
import getProjection from './projection';


let svg = d3.select('svg'),
  height = +svg.attr('height'),
  width = +svg.attr('width');

svg.attr('viewBox', '-550 -550 1100 1000');

let projection = getProjection(width, height);
let path = d3.geoPath().projection(projection);
let centered = null;
const clicked = (d) => {
  let path = d3.geoPath().projection(projection);
  let x, y, k;
  if (d && centered !== d) {
    let centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 6;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }


  svg.selectAll('path')
    .style('fill', (d) => centered && d === centered ? 'lightgrey' : 'rgb(52, 52, 52)');
  d3.select('g').transition()
    .duration(750)
    .attr('transform', `translate(${  width / 2  },${  height / 2  })scale(${  k  })translate(${  -x  },${  -y  })`);
};

// Tooltip
let tip = d3Tip().attr('class', 'd3-tip').html((d) => {
  console.log(d);
  return "<strong>Address:</strong> <span style='color:red'>" + d.address + "</span>";
});

svg.call(tip);


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

  drawMap(svg, precincts, path, clicked);
  drawMetered(metered_coordinates, projection, tip, true);
  //drawUnmetered(unmetered_coordinates, projection, tip, true);

}

