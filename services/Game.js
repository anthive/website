import publicApi from '../plugins/axios'

async function getGames(params) {
  return publicApi.get('/games', { params }).then(resp => resp.data)
}

async function getGame(id) {
  const gameUrl = `/games/${id}`
  return publicApi.get(gameUrl).then(resp => resp.data)
}

export { getGames, getGame }
