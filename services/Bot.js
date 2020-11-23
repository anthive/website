import axios from 'axios'

async function getBotsLeaderboard() {
  const botsUrl = `${process.env.API_URL}/leaderboard/bots`
  return axios.get(botsUrl).then(resp => resp.data)
}

export { getBotsLeaderboard }
