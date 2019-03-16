

//Input:  "(37.801541, -122.401568)"
//Output:  [37.801541, -122.401568]
export const parseGeoString = (input) => {
  let substr = input.slice(input.indexOf('(') + 1, input.indexOf(')'));
  let coordinates = substr.split(', ');
  coordinates = coordinates.map(e => e.split(' '));
  coordinates = coordinates.map(e => +e);
  return coordinates;
};
