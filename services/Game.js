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

async function search(sort, page, size, version = '3.0') {
  console.log('searchGames')

  const adapterV3 = data => {
    console.log(data)
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
    console.log(resp)
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

  const versionQueries = {
    '3.0': {
      term: { Version: '3.0' }
    },
    '4.0': {
      term: { version: '4.0' }
    }
  }

  const adapter = adapters[version]

  const querySearch = {
    query: versionQueries[version],
    size: size,
    sort: sort,
    from: size * (page - 1)
  }

  const url = SEARCH_HANDLER + '/' + process.env.INDEX_GAMES + '/_search'
  const resp = await esAxios.post(url, querySearch).catch(handleError)

  const data = adapter(resp.data.hits)

  console.log(data)

  return data
}
