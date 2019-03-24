const titleCase = require('title-case');

//Input:  "(37.801541, -122.401568)"
//Output:  [37.801541, -122.401568]
export const parseGeoString = (input) => {
  let substr = input.slice(input.indexOf('(') + 1, input.indexOf(')'));
  let coordinates = substr.split(', ');
  coordinates = coordinates.map(e => e.split(' '));
  coordinates = coordinates.map(e => +e);
  return coordinates;
};


export const extractData = (metered, unmetered) => {
  let metered_coordinates = metered.map(e => {
    let gpsStr = e['Location'];
    let gps = parseGeoString(gpsStr);
    let lat = gps[0];
    let lng = gps[1];

    let result = {
      coordinates : {
        latitude : lat,
        longitude : lng
      },
      address: titleCase(`${e['STREETNAME']} ${e['STREET_NUM']}`)
    };
    
    return result;
  });

  let unmetered_coordinates = unmetered.features.map(e => {
    let gps = e.geometry.coordinates;
    let lat = gps[1];
    let lng = gps[0];
    let result = {
      coordinates: {
        latitude: lat,
        longitude: lng
      },
      address: titleCase(`${e.properties.street}`)
    };
    return result;
  });

  return [metered_coordinates, unmetered_coordinates];
};