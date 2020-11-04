import axios from 'axios'

const baseURL = 'https://anthive.io/'
const apiURL = process.env.API_URL
// const githubURL = 'https://api.github.com/'

const apiAxios = axios.create({
  baseURL: apiURL,
  timeout: 30000
})

class User {
  constructor() {
    this.UserId = ''
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

  async initUser(user) {
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

  async getUserData(id) {
    this.UserId = id
    if (this.UserId === '' || this.UserId === undefined) return

    return apiAxios.get('users/' + this.UserId).then(res => {
      const user = res.data
      this.Username = user.username
      return {
        id: user.id,
        name: user.username != null ? user.username : this.UserId,
        fullName: user.fullName,
        avatar: this.photoUrl(160),
        company: user.company,
        city: user.city,
        country: user.country
      }
    })
  }

  photoUrl(size = 70) {
    return `${apiURL}images/${this.Username}/${size}/${size}`
  }

  langUrl(lang = this.Lang) {
    return baseURL + 'skins/lang/' + lang + '.png'
  }

  antUrl(big = false) {
    if (big) {
      return baseURL + 'skins/client/' + this.Skin + '/antBig.png'
    }
    return baseURL + 'skins/client/' + this.Skin + '/ant.png'
  }

  hiveUrl(big = false) {
    if (big) {
      return baseURL + 'skins/client/' + this.Skin + '/hiveBig.png'
    }
    return baseURL + 'skins/client/' + this.Skin + '/hive.png'
  }

  scoreString() {
    const suffixes = ['', 'K', 'M', 'B', 't']
    const suffixNum = Math.floor((('' + this.Wealth).length - 1) / 3)
    const shortValue = parseFloat(
      (suffixNum != 0 ? this.Wealth / Math.pow(1000, suffixNum) : this.Wealth).toPrecision(2)
    )
    return shortValue + suffixes[suffixNum]
  }
}

function timeAgo(epochStamp) {
  const diff = Math.round(new Date()) - epochStamp
  const periods = {
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
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
export { User, timeAgo }
