const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const planets = require('./planets.mongo')


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
    .on('data', async (data) => {
      if (data && isHubitable(data)) {
        // hubitablePlanets.push(data);  
          savePlanet(data)
      }
    })
    .on('error', (err) => {
      console.log('---ERROR---', err)
      reject(err)
    })
    .on('end', async () => {
      const planetsCount = (await getAllPlanets())?.length
      console.log('Num:', planetsCount || 0);
      resolve()
    });
  });
};

async function getAllPlanets() {
  // return hubitablePlanets
  return await planets
  .find(
    {},
    {
      _id: 0,
      __v: 0
    }
  )
}

async function savePlanet(planet) {
  try {
    await planets.updateOne({
      keplerName: planet.kepler_name
    }, {
      keplerName: planet.kepler_name
    }, {
      upsert: true
    })
  } catch (err) {
    console.log(`Could not save the planet ${err}`)
    // reject(err)
  }
}

async function isPlanetExist(planetName) {
  const planet = await planets.findOne({
    keplerName: planetName || ''
  })

  console.log('isPlanetExist_planet', planet)
  return planet?.keplerName ? true : false
};

module.exports = {
  loadPlanetsData,
  getAllPlanets,
  isPlanetExist
};