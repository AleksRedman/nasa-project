const {
  getAllLaunches,
  addNewLaunch,
  isLaunchExist,
  abortLaunch
} = require('../../models/launches.model');

const {
  isPlanetExist
} = require('../../models/planets.model');

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches())
};

async function httpAddNewLaunch(req, res) {
  const launch = req.body

  launch.launchDate = new Date(launch.launchDate)

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.destination ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: 'Missed required launch property'
    })
  }

  if (launch.launchDate.toString() === 'Invalid Date') {
    return res.status(400).json({
      error: 'Invalid launch date'
    })
  }

  const isPlanetEx = await isPlanetExist(launch.destination || '')

  console.log('isPlanetExist', isPlanetEx)
  if (!isPlanetEx) {
    return res.status(400).json({
      error: 'Invalid launch destination'
    })
  }

  await addNewLaunch(req.body)

  return res.status(201).json(launch)
};

async function httpAbortLaunch(req, res) {
  const launchId = +req?.params?.id

  if (!launchId) {
    return res.status(400).json({
      error: 'Missed launch id'
    })
  }

  if (!await isLaunchExist(launchId)) {
    return res.status(404).json({
      error: 'The launch isn\'t exist'
    })
  }

  const aborted = await abortLaunch(launchId)
  console.log('httpAbortLaunch_aborted', aborted)

  return res.status(200).json(aborted)
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}
