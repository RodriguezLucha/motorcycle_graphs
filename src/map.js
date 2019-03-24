import * as d3 from 'd3';

export const drawMap = (svg, precincts, path, clicked) => {
  svg.append('g')
    .attr('class', 'precinct')
    .selectAll('path')
    .data(precincts.features)
    .enter()
    .append('path')
    .attr('d', path)
    .on('click', clicked)
    .on('mouseover', function (d) {
      if (d3.select(this).style('fill') === 'yellow') return;
      d3.select(this)
        .style('fill', 'rgb(104, 104, 104)');
    })
    .on('mouseout', function (d) {
      if(d3.select(this).style('fill') === 'yellow') return;
      d3.select(this)
        .style('fill', 'rgb(52, 52, 52)');
    })
};