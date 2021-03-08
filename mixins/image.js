import { getImageById } from '@/services/Image'
const defaultBotAvatar = '/skins/img/default-bot-avatar.png'
const defaultUserAvatar = '/skins/img/default-user-avatar.png'
const Image = {
  methods: {
    getBotAvatar(bot, size) {
      return bot && bot.avatar ? getImageById(bot.avatar, size) : defaultBotAvatar
    },
    getUserAvatar(user, size) {
      return user && user.avatar ? getImageById(user.avatar, size) : defaultUserAvatar
    },
    getBotAuthorAvatar(bot, size) {
      return bot && bot.userAvatar ? getImageById(bot.userAvatar, size) : defaultUserAvatar
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
