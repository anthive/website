<template>
 <div class="chip">
   <div class="img" :style="`background: center / cover no-repeat url(${getAvatar(bot.avatar)})`">
     <img
        class="lang-icon"
        width="40px"
        :src="getCurrentLangImg"
        :alt="getCurrentLang.name" 
      />
   </div>
   <div class="description">
    <p class="bot-title">{{ getStringTruncated(bot.displayName, 10) }}<span class="version">v {{ bot.v }}</span></p>
    <div class="statistics">
      <div class="d-flex justify-space-between">
        <p>{{ $t("userInfo.mmr") }}:</p>
        <p class="value">{{ bot.mmr }}</p>
      </div>
    </div>
   </div>
 </div>
</template>

<script>
import langs from '../static/langs/data.json'
import Image from '@/mixins/image'
import Truncate from '@/mixins/truncate'

export default {
  name: 'AntHiveBotVertical',
  mixins: [Image, Truncate],
  props: {
    bot: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    getCurrentLang() {
      return langs.find(lang => lang.id === this.bot.lang)
    },
    getCurrentLangImg() {
      return this.getCurrentLang && this.getCurrentLang.img
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.chip {
  display: flex;
  flex-direction: column;
  box-shadow: $box-shadow-default;
  max-height: 300px;
  margin-bottom: 40px;
  background-color: $color-white;

  .img {
    background-position: center;
    width: 100%;
    height: 120px;
    background: $color-red-300;
  }

  .bot-title {
    font-weight: $font-weight-bold;
    margin-bottom: 10px;
  }

  .version {
    margin-left: 10px;
    font-weight: $font-weight-normal;
    color: $color-violet-350;
  }

  .lang-icon {
    background-color: $color-white;
    border-right: 2px solid $color-white;
    border-bottom: 2px solid $color-white;
  }

  .lang-name {
    font-size: $font-smaller;
    color: $color-violet-600;
  }

  .description {
    padding: 12px 18px;
  }

  .statistics {
    p {
      margin-bottom: 0;
      font-size: $font-medium;
    }

    .value {
      font-weight: $font-weight-bold;
    }
  }
}
</style>
