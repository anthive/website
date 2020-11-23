import axios from 'axios'

async function getBotsLeaderboard() {
  return axios.get(`${process.env.API_URL}/leaderboard/bots`).then(resp => resp.data)
}

export { getBotsLeaderboard }
