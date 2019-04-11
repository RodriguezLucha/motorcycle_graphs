# SF Motor Parking

D3 Visualization of Motorcycle Parking in San Francisco


## Live

* [Live](https://rodriguezlucha.github.io/motorcycle_graphs/)


## Technologies Used

* HTML & CSS
* D3.js

## Key features

* SVG based visualization built with D3

![splash](https://github.com/RodriguezLucha/motorcycle_graphs/raw/master/screenshots/zoomed.png)

* Hover, zoom, other misc render effects

* Google Maps Street View integration

## Fun Code Snippets

Once you wrap your brain around how D3 works, you can implement some really snazzy transition effects easily.
Below is the code, notice how you can just throw in a `.transition()` and `.duration()` in between each effect. 
The results are pretty snazzy!

```js
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
```

## Future Direction
* Search for moto parking spots given an address as input from the user.
