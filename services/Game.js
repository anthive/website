import axios from 'axios'

async function getGames(params) {
  return axios.get(`${process.env.API_URL}games`, { params }).then(resp => resp.data)
}

async function getGame(id) {
  return axios.get(`${process.env.API_URL}games/${id}`).then(resp => resp.data)
}

export { getGames, getGame }
