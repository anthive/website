import axios from 'axios'

async function getGames(params) {
  const gamesURL = `${process.env.API_URL}/games`
  return axios.get(gamesURL, { params }).then(resp => resp.data)
}

async function getGame(id) {
  const gameURL = `${process.env.API_URL}/games/${id}`
  return axios.get(gameURL).then(resp => resp.data)
}

export { getGames, getGame }
