import publicApi from '../plugins/axios'

export const getBotsLeaderboard = async() => {
  try {
    const { data } = await publicApi.get('/bots')
    return data
  } catch ({ response }) {
    if (response && response.data && response.data.error) { return null }
  }
}
