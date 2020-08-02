export { search }

import axios from 'axios'
import { handleError } from '@/services/Search'

const esAxios = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000
})

const SEARCH_HANDLER = '/search'

function lowercaseObjectKeys(object) {
  return Object.keys(object).reduce((c, k) => ((c[k.toLowerCase()] = object[k]), c), {})
}

async function search(sort, page, size, version = '4.0', username) {
  const adapterV3 = data => {
    const resp = {}
    resp.total = data.total.value
    resp.games = data.hits.map(g => {
      g._source.id = g._id
      return g._source
    })
    resp.games = resp.games.map(g => {
      g = lowercaseObjectKeys(g)
      g.bots = g.players
      g.map = g.mapsettings
      g.finished = g.played
      g.map.theme = g.map.Skin
      g.bots = g.bots.map(b => {
        b = lowercaseObjectKeys(b)
        b.theme = b.skin
        return b
      })
      return g
    })
    return resp
  }

  const adapterV4 = data => {
    const resp = {}
    resp.total = data.total.value
    resp.games = data.hits.map(g => {
      return g._source
    })
    return resp
  }

  const adapters = {
    '3.0': adapterV3,
    '4.0': adapterV4
  }

  const versionMatches = {
    '3.0': { match: { Version: '3.0' } },
    '4.0': { match: { version: '4.0' } }
  }

  const usernameMatches = {
    '3.0': { match: { 'Players.Username': username } },
    '4.0': { match: { 'bots.username': username } }
  }

  const matches = [versionMatches[version]]
  if (username) {
    matches.unshift(usernameMatches[version])
  }

  const adapter = adapters[version]

  const querySearch = {
    query: {
      bool: {
        must: matches
      }
    },
    size: size,
    sort: sort,
    from: size * (page - 1)
  }

  const url = SEARCH_HANDLER + '/' + process.env.INDEX_GAMES + '/_search'
  const resp = await esAxios.post(url, querySearch).catch(handleError)

  const data = adapter(resp.data.hits)
  return data
}
