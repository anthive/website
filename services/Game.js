export { search }

import axios from 'axios'
import { query, handleError } from '@/services/Search'

const esAxios = axios.create({
  baseURL: process.env.esUrl,
  timeout: 30000
})

const BASE_HANDLER = () => `/games-prod`
const SEARCH_HANDLER = () => `${BASE_HANDLER()}/_search`

async function search(sort, page, size, filter) {
  console.log('searchGames')

  const q = query(sort, page, size, filter)

  const resp = await esAxios.get(SEARCH_HANDLER(), q).catch(handleError)
  return resp.data.hits
}
