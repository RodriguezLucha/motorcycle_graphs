let width = 600,
  height = 400;

let projection = d3.geoConicEqualArea()
  .scale(153)
  .translate([width / 2, height / 2])
  .precision(.1);

let path = d3.geoPath()
  .projection(projection);

let graticule = d3.geoGraticule();

let svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

d3.json('data/sf.topojson', (error, world) => {
  if (error) throw error;

  svg.append('path')
    .datum(topojson.feature(world, world.objects.land))
    .attr('class', 'land')
    .attr('d', path);

  svg.append('path')
    .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
    .attr('class', 'boundary')
    .attr('d', path);

  svg.append('path')
    .datum(graticule)
    .attr('class', 'graticule')
    .attr('d', path);
});

d3.select(self.frameElement).style('height', `${height  }px`);