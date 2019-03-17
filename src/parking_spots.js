import * as d3 from 'd3';

export const drawMetered = (metered_coordinates, projection, stop_early = false) => {
  let counter = 0;
  let total = metered_coordinates.length;
  if (stop_early) {
    total = 10;
  }

  let t = d3.interval(() => {
    let d = metered_coordinates[counter];

    d3.select('g')
      .append('circle')
      .attr('r', 5.0)
      .attr('class', 'metered')
      .transition()
      .duration(500)
      .attr('cx', projection([d[1], d[0]])[0])
      .attr('cy', projection([d[1], d[0]])[1])
      .transition()
      .duration(1000)
      .attr('r', 3.0);

    counter = counter + 1;

    if (counter == total) {
      t.stop();
    }
  }, 1);
};


export const drawUnmetered = (unmetered_coordinates, projection, stop_early = false) => {
  let j = 0;
  let total = unmetered_coordinates.length;

  if (stop_early) {
    total = 10;
  }

  let t2 = d3.interval(() => {
    let du = unmetered_coordinates[j];

    d3.select('g')
      .append('circle')
      .attr('r', 5.0)
      .transition()
      .duration(500)
      .attr('class', 'unmetered')
      .attr('cx', projection([du[1], du[0]])[0])
      .attr('cy', projection([du[1], du[0]])[1])
      .transition()
      .duration(1000)
      .attr('r', 3.0);

    j = j + 1;

    if (j === total) {
      t2.stop();
    }
  }, 1);
};