import { getImageById } from '@/services/Image'
const Image = {
  methods: {
    getAvatar(id, size) {
      return getImageById(id, size)
    }
  }
}

export default Image
