export const drawMap = (svg, precincts, path, clicked) => {
  svg.append('g')
    .attr('class', 'precinct')
    .selectAll('path')
    .data(precincts.features)
    .enter()
    .append('path')
    .attr('d', path)
    .on('click', clicked);
};