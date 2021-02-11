import publicApi from '../plugins/axios'

export const getBotsLeaderboard = async(params) => {
  try {
    const { data } = await publicApi.get('/bots', { params })
    return data
  } catch ({ response }) {
    if (response && response.data && response.data.error) { return null }
  }
}
