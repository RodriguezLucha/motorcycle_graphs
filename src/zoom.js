import * as d3 from 'd3';

export const setupZoom = (projection, width, height, svg) => {
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
      .style('fill', (d) => centered && d === centered ? 'yellow' : 'rgb(52, 52, 52)');
    d3.select('g').transition()
      .duration(1500)
      .attr('transform', `translate(${  width / 2  },${  height / 2  })scale(${  k  })translate(${  -x  },${  -y  })`);
  };

  return clicked;
};