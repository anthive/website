import publicApi from '../plugins/axios'

function getBotsLeaderboard() {
  // TODO: use new bots api '/bots'
  const botsUrl = '/leaderboard/bots'
  return publicApi.get(botsUrl).then(resp => resp.data)
}

export { getBotsLeaderboard }
