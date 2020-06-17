export { search }

import axios from 'axios'
import { handleError } from '@/services/Search'

const esAxios = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000
})

const SEARCH_HANDLER = '/search'

async function search(sort, page, size, searchString = { match_all: {} }) {
  console.log('searchGames')

  const querySearch = {
    query: searchString,
    size: size,
    sort: sort,
    from: size * (page - 1)
  }

  const url = SEARCH_HANDLER + '/' + process.env.INDEX_GAMES + '/_search'
  const resp = await esAxios.post(url, querySearch).catch(handleError)
  return resp.data.hits
}
