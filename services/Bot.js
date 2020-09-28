export { search }

import axios from 'axios'

import { User } from '@/services/User'

const esAxios = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000
})

const SEARCH_HANDLER = '/search'

async function search(sortBy) {
  const querySearch = {
    size: 0,
    aggs: {
      ByUsername: {
        terms: {
          field: 'Username.keyword',
          size: 100,
          order: sortBy
        },
        aggs: {
          totalGames: {
            sum: {
              field: 'GamesCount'
            }
          },
          totalWealth: {
            sum: {
              field: 'Wealth'
            }
          }
        }
      }
    }
  }

  const url = SEARCH_HANDLER + '/' + process.env.INDEX_STATS + '/_search'
  const resp = await esAxios.post(url, querySearch)

  return resp.data.aggregations.ByUsername.buckets.map(u => {
    const user = new User()
    user.Username = u.key
    user.TotalGames = u.totalGames.value
    user.TotalWealth = u.totalWealth.value
    return user
  })
}
