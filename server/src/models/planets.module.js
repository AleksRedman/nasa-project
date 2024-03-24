const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');


const hubitablePlanets = [];

function isHubitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
};

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (data && isHubitable(data)) {
          hubitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log('---ERROR---', err)
        reject(err)
    })
    .on('end', () => {
        console.log('Num:', hubitablePlanets?.length || 0);
        resolve()
    });
  });
};

module.exports = {
  loadPlanetsData,
  planets: hubitablePlanets
};