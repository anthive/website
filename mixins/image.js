import { getImageById } from '@/services/Image'
const Image = {
  methods: {
    getAvatar(id, size) {
      return id && getImageById(id, size)
    },
    getUserBackgroundImage(id, widht, height) {
      return id && getImageById(id, widht, height)
    },
    getLangImg(lang) {
      return `/skins/lang/${lang}.png`
    },
    getAntSkinImg(skin) {
      return `/skins/client/${skin}/ant.png`
    },
    getHiveSkinImg(skin) {
      return `/skins/client/${skin}/hive.png`
    }
  }
}

export default Image
