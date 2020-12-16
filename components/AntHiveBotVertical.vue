<template>
 <div class="chip">
   <div class="img" :style="`background: center / cover no-repeat url(${getBotAvatar})`">
     <img
        class="lang-icon"
        width="40px"
        :src="getLangImg"
        :alt="lang" 
      />
   </div>
   <div class="description">
    <p class="mb-0"><strong>{{ name }}</strong></p>
    <p class="lang-name">{{ getLangName }}</p>
    <div class="statistics">
      <p>{{ $t("userInfo.games") }}: <strong>{{ games }}</strong></p>
      <p>{{ $t("userInfo.wins") }}: <strong>{{ wins }}</strong></p>
    </div>
   </div>
 </div>
</template>


<script>
import langs from '../static/langs/data.json'

export default {
  name: 'AntHiveBotVertical',
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    avatar: {
      type: String,
      required: false,
      default: ''
    },
    lang: {
      type: String,
      required: false,
      default: ''
    },
    games: {
      type: String,
      required: false,
      default: ''
    },
    wins: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    getCurrentLang() {
      return langs.find(lang => lang.id === this.lang)
    },
    getLangName() {
      return this.getCurrentLang && this.getCurrentLang.name
    },
    getLangImg() {
      return this.getCurrentLang && this.getCurrentLang.img
    },
    getBotAvatar() {
      return this.avatar
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
  height: 300px;

  .img {
    background-position: center;
    width: 100%;
    height: 130px;
    background: $color-red-300;
    padding: 10px;
  }

  .lang-icon {
    margin-right: 10px;
  }

  .lang-name {
    font-size: $font-smaller;
    color: $color-violet-600;
  }

  .description {
    padding: 20px;
  }

  .statistics {
    p {
      margin-bottom: 0;
      font-size: $font-small;
    }
  }
}
</style>
