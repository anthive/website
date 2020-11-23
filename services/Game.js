import axios from 'axios'

async function getGames(params) {
  const gamesUrl = `${process.env.API_URL}/games`
  return axios.get(gamesUrl, { params }).then(resp => resp.data)
}

async function getGame(id) {
  const gameUrl = `${process.env.API_URL}/games/${id}`
  return axios.get(gameUrl).then(resp => resp.data)
}

export { getGames, getGame }
