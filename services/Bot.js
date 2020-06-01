export { search }

import axios from 'axios'
import { query, handleError } from '@/services/Search'

import { User } from '@/services/User'

const esAxios = axios.create({
  baseURL: process.env.esUrl,
  timeout: 30000
})

const BASE_HANDLER = () => `/bots-prod`
const SEARCH_HANDLER = () => `${BASE_HANDLER()}/_search`

async function search(sort, page, size, filter) {
  console.log('searchBots')

  const querySearch = query(sort, page, size, filter)

  const resp = await esAxios.get(SEARCH_HANDLER(), querySearch).catch(handleError)

  return resp.data.hits.hits.map(bots => {
    const user = new User()
    user.initUser(bots._source)
    return user
  })
}
