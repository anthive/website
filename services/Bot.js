import axios from 'axios'

async function getBotsLeaderboard() {
  const botsURL = `${process.env.API_URL}/leaderboard/bots`
  return axios.get(botsURL).then(resp => resp.data)
}

export { getBotsLeaderboard }
