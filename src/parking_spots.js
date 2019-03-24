import * as d3 from 'd3';

export const drawMetered = (metered_coordinates, projection, tip, stop_early = false) => {
  let counter = 0;
  let total = metered_coordinates.length;
  if (stop_early) {
    total = 3;
  }

  let t = d3.interval(() => {
    let d = metered_coordinates[counter];

    counter = counter + 1;

    if (counter == total) {
      t.stop();
    }

    let coord_array = [d.coordinates.longitude, d.coordinates.latitude];

    console.log('Outer this', this);

    const mouseOverFunction = () => {
      console.log('Inner this', this);
      tip.show();
    };

    d3.select('g')
      .append('circle')
      .datum(d)
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration(100)
          .attr('r', 10);
        tip.show(d, this);
      })


    //.on('mouseover', mouseOverFunction)
    // .on('mouseover', function (d) {
    //   d3.select(this)
    //     .transition()
    //     .duration(1000)
    //     .attr('r', 10);
    //   tip.show(d);
    // })
    //.on('mouseover', tip.show)
    // .on('mouseout', tip.hide)

      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(100)
          .attr('r', 3);
        tip.hide(d, this);
      })

      .attr('r', 5.0)
      .attr('class', 'metered')
      .transition()
      .duration(500)
      .attr('cx', projection(coord_array)[0])
      .attr('cy', projection(coord_array)[1])
      .transition()
      .duration(1000)
      .attr('r', 3.0);
  }, 1);
};


export const drawUnmetered = (unmetered_coordinates, projection, tip, stop_early = false) => {
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
  }, 200);
};