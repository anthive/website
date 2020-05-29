export { searchGames, searchBots }

import axios from 'axios'

import { User } from '@/services/User'

const esAxios = axios.create({
  baseURL: process.env.baseUrl,
  timeout: 30000
})

function query(sort, page, size) {
  const es_syntax = {
    size: size,
    sort: sort,
    from: size * (page - 1)
  }
  return {
    params: {
      source: JSON.stringify(es_syntax),
      source_content_type: 'application/json'
    }
  }
}

function handleError(error) {
  if (error.response) {
    console.log(error.response.data)
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log('Error', error.message)
  }
  console.log(error.config.url)
  console.log(error.config.params)
}

async function searchGames(sort, page, size, filter) {
  console.log('searchGames')

  const handle = '/games-prod/_search'
  const q = query(sort, page, size, filter)

  const resp = await esAxios.get(handle, q).catch(handleError)
  return resp.data.hits
}

async function searchBots(sort, page, size, filter) {
  console.log('searchBots')

  const handle = '/bots-prod/_search'
  const q = query(sort, page, size, filter)

  const resp = await esAxios.get(handle, q).catch(handleError)

  return resp.data.hits.hits.map(bots => {
    const user = new User()
    user.initUser(bots._source)
    return user
  })
}
