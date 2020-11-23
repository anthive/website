import axios from 'axios'

const IMAGE_HANDLER = process.env.API_URL + '/images'

class ImageActions {
  static async saveImage(file) {
    if (file.size > 10000000) {
      return Promise.reject(new Error('Use an image smaller than 10Mb'))
    }
    const formData = new FormData()
    formData.append('file', file)

    const { data } = await axios.post(IMAGE_HANDLER, formData)

    return data
  }

  static getImageById(id, width, height = width) {
    return `${IMAGE_HANDLER}/${id}/${width}/${height}`
  }
}

export { ImageActions }
