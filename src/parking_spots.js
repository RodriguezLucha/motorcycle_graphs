import * as d3 from 'd3';

const debugTotal = 3;

export const drawMetered = (metered_coordinates, projection, tip, stop_early = false) => {
  let counter = 0;
  let total = metered_coordinates.length;
  if (stop_early) {
    total = debugTotal;
  }

  let t = d3.interval(() => {
    let d = metered_coordinates[counter];

    counter = counter + 1;

    if (counter == total) {
      t.stop();
    }

    let coord_array = [d.lng, d.lat];

    d3.select('g')
      .append('circle')
      .datum(d)
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration(100)
          .attr('r', 4);
        tip.show(d, this);
      })

      .on('click', (d) => {
        let lat = d.lat;
        let lng = d.lng;
        let url = `https://maps.google.com/maps?layer=c&cbll=${lat},${lng}`;
        window.open(url, '_blank');
      })

      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(100)
          .attr('r', 3);
        tip.hide(d, this);
      })
      .attr('r', 5.0)
      .attr('class', 'metered')
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
    total = debugTotal;
  }

  let t2 = d3.interval(() => {
    let du = unmetered_coordinates[j];

    let coord_array = [du.lng, du.lat];

    d3.select('g')
      .append('circle')
      .datum(du)
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration(100)
          .attr('r', 4);
        tip.show(d, this);
      })

      .on('click', (d) => {
        let lat = d.lat;
        let lng = d.lng;
        let url = `https://maps.google.com/maps?layer=c&cbll=${lat},${lng}`;
        window.open(url, '_blank');
      })

      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(100)
          .attr('r', 3);
        tip.hide(d, this);
      })
      .attr('r', 5.0)
      .attr('class', 'unmetered')
      .attr('cx', projection(coord_array)[0])
      .attr('cy', projection(coord_array)[1])
      .transition()
      .duration(1000)
      .attr('r', 3.0);


    j = j + 1;

    if (j === total) {
      t2.stop();
    }
  }, 1);
};