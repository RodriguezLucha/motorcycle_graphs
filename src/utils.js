

//Input:  "(37.801541, -122.401568)"
//Output:  [37.801541, -122.401568]
export const parseGeoString = (input) => {
  let substr = input.slice(input.indexOf('(') + 1, input.indexOf(')'));
  let coordinates = substr.split(', ');
  coordinates = coordinates.map(e => e.split(' '));
  coordinates = coordinates.map(e => +e);
  return coordinates;
};


export const extractLatitudeAndLongitutes = (metered, unmetered) => {
  let metered_coordinates = metered.map(e => {
    let gpsStr = e['Location'];
    let gps = parseGeoString(gpsStr);
    let lat = gps[0];
    let lng = gps[1];
    let coordinates = [lat, lng];

    let result = {
      coordinates : {
        latitude : lat,
        longitude : lng
      },
      address: `${e['STREETNAME']} ${e['STREET_NUM']}`
    };
    
    return result;
  });

  let unmetered_coordinates = unmetered.features.map(e => {
    let gps = e.geometry.coordinates;
    let lat = gps[1];
    let lng = gps[0];
    let coordinates = [lat, lng];
    return coordinates;
  });

  return [metered_coordinates, unmetered_coordinates];
};