import axios from 'axios'

const apiUrl = process.env.API_URL

const publicApi = axios.create({
  baseURL: `${apiUrl}/public`,
  timeout: 15000
})

export default publicApi
