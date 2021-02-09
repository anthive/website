import publicApi from '../plugins/axios'

function getBotsLeaderboard() {
  const botsUrl = '/bots'
  return publicApi.get(botsUrl).then(resp => resp.data)
}

export { getBotsLeaderboard }
