import publicApi from '../plugins/axios'

async function getBotsLeaderboard() {
  const botsUrl = `/leaderboard/bots`
  return publicApi.get(botsUrl).then(resp => resp.data)
}

export { getBotsLeaderboard }
