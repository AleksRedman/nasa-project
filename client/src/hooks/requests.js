const API_URL= 'http://localhost:8000'

async function httpGetPlanets() {
  const responce = await fetch(`${API_URL}/planets`)

  return await responce.json( )
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const fetchedLaunches = await fetch(`${API_URL}/launches`)
  const launches = await fetchedLaunches.json()
  console.log('httpGetLaunches', launches)
  return launches.sort((a,b) => a.flightNumber - b.flightNumber)
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(launch)
    })
  } catch (error) {
    return { ok: false }
  }
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return { ok: false }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};