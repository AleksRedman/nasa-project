const launches = require('./launches.mongo')
const planets = require('./planets.mongo')

async function getAllLaunches() {
  try {
    return await launches
    .find(
      {},
      {
        __id: 0,
        __v: 0
      }
    )
  } catch (error) {
    console.log(`Could not find launches. ${err}`)
  }
};

async function saveLaunch(launch) {
  try {
    await launches.findOneAndUpdate({
      flightNumber: launch.flightNumber
    }, launch, {
      upsert: true
    })
    return true
  } catch (err) {
    console.log(`Could not save the launch ${err}`)
    return false
  }
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches
    .findOne()
    .sort('-flightNumber')
    console.log('getLatestFlightNumber', latestLaunch)
  return latestLaunch?.flightNumber || 100
};

async function addNewLaunch(launch) {
  console.log('addNewLaunch', launch)
  let latestFlightNumber = await getLatestFlightNumber()
  latestFlightNumber += 1
  
  console.log('latestFlightNumber', latestFlightNumber)

  const res = saveLaunch(Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customer: ['NOAA ', 'NASA'],
    upcoming: true,
    success: true,
  }))

  return res
};

async function isLaunchExist(launchId) {
  const launch = await launches.findOne({ flightNumber: launchId })

  return launch?.flightNumber === launchId ? launch : null
};

async function abortLaunch(launchId) {
  try {
    await launches.findOneAndUpdate({
      flightNumber: launchId
    }, {
      upcoming: false,
      success: false
    }, {
      upsert: true
    })
    return true
  } catch (err) {
    console.log(`Could not abort the launch ${err}`)
    return false
  }
};

module.exports = {
  getAllLaunches,
  addNewLaunch,
  isLaunchExist,
  abortLaunch
}