import publicApi from '../plugins/axios'

function getGames(params) {
  return publicApi.get('/games', { params }).then(resp => resp.data)
}

function getGame(id) {
  const gameUrl = `/game/${id}`
  return publicApi.get(gameUrl).then(resp => resp.data)
}

function getUserGames(username) {
  const gameUrl = `/games/?un=${username}`
  return publicApi.get(gameUrl).then(resp => resp.data)
}

export { getGames, getGame, getUserGames }
