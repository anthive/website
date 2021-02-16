import publicApi from '../plugins/axios'

class User {
  constructor() {
    this.Username = ''
    this.Lang = ''
    this.Version = ''
    this.Games = ''
    this.Wealth = ''
    this.Wg = ''
    this.Skin = ''
    this.Stats = {}
    this.TotalGames = 0
    this.TotalWealth = 0
  }

  initUser(user) {
    this.Username = user.username
    this.Lang = user.lang
    this.Version = user.version
    this.Games = user.games
    this.Wealth = user.wealth
    this.Wg = user.wg
    this.Skin = user.skin
    this.Stats = user.stats
    this.TotalGames = user.totalgames
    this.TotalWealth = user.totalwealth
  }

  getUserData(username) {
    this.Username = username
    if (this.Username === '' || this.Username === undefined) {
      return
    }
    return publicApi.get(`/user?username=${this.Username}`).then(res => res.data)
  }

  scoreString() {
    const suffixes = ['', 'K', 'M', 'B', 't']
    const suffixNum = Math.floor((('' + this.Wealth).length - 1) / 3)
    const shortValue = parseFloat(
      (suffixNum !== 0 ? this.Wealth / 1000 ** suffixNum : this.Wealth).toPrecision(2)
    )
    return shortValue + suffixes[suffixNum]
  }
}

function timeAgo(epochStamp) {
  const diff = Math.round(new Date() / 1000) - epochStamp
  const periods = {
    month: 30 * 24 * 60 * 60,
    week: 7 * 24 * 60 * 60,
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60,
    second: 1000
  }
  if (diff > periods.month) {
    // it was at least a month ago
    return { time: Math.floor(diff / periods.month), text: 'monthsAgo' }
  } else if (diff > periods.week) {
    return { time: Math.floor(diff / periods.week), text: 'weeksAgo' }
  } else if (diff > periods.day) {
    return { time: Math.floor(diff / periods.day), text: 'daysAgo' }
  } else if (diff > periods.hour) {
    return { time: Math.floor(diff / periods.hour), text: 'hoursAgo' }
  } else if (diff > periods.minute) {
    return { time: Math.floor(diff / periods.minute), text: 'minutesAgo' }
  } else if (diff > periods.second) {
    return { time: Math.floor(diff / periods.second), text: 'secondsAgo' }
  }
  return { time: null, text: 'justNow' }
}
const getUsersLeaderboard = async(params) => {
  try {
    const { data } = await publicApi.get('/leaderboard/users', { params })
    return data
  } catch ({ response }) {
    if (response && response.data && response.data.error) { return null }
  }
}

export { User, timeAgo, getUsersLeaderboard }
