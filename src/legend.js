import * as d3 from 'd3';


export const drawLegend = () => {
  let parkings = [
    {
      name: 'Metered',
      class: 'metered',
      x_pos: 83
    },
    {
      name:'Unmetered',
      class: 'unmetered',
      x_pos: 100
    }
  ];

  let legend = d3.select('g')
    .attr('x', 100)
    .attr('y', 100);

  parkings.forEach((parking, i) => {
    let x_position = -400;
    let y_position = (i * 40) - 500;

    let legendRow = legend.append('g')
      .attr('transform', `translate(${x_position}, ${y_position})`);
    legendRow.append('text')
      .attr('x', parking.x_pos)
      .attr('y', 5)
      .attr('text-anchor', 'end')
      .text(parking.name);
    legendRow.append('circle')
      .attr('r', 16)
      .attr('class', parking.class);
  });
};