export { search }

import axios from 'axios'
import { query, handleError } from '@/services/Search'

const esAxios = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000
})

const SEARCH_HANDLER = '/search'

async function search(sort, page, size, filter) {
  console.log('searchGames')

  const querySearch = query(sort, page, size, filter)

  const url = SEARCH_HANDLER + '/' + process.env.INDEX_GAMES + '/_search'
  const resp = await esAxios.post(url, querySearch).catch(handleError)
  return resp.data.hits
}
