<template>
 <div class="chip">
   <div class="chip__img" :style="`background: center / cover no-repeat url(${getBotAvatar})`">
     <img
        class="chip__lang-icon"
        width="40px"
        :src="getLangImg"
        :alt="lang" 
      />
   </div>
   <div class="chip__description">
    <p class="mb-0"><strong>{{ name }}</strong></p>
    <p class="chip__lang-name">{{ getLangName }}</p>
    <div class="chip__statistics">
      <p>{{ $t("userInfo.games") }}: <strong>{{ games }}</strong></p>
      <p>{{ $t("userInfo.wins") }}: <strong>{{ wins }}</strong></p>
    </div>
   </div>
 </div>
</template>


<script>
import langs from '../static/langs/data.json'

export default {
  name: 'userAchivementChip',
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

  &__img {
    background-position: center;
    width: 100%;
    height: 130px;
    background: $color-red-300;
    padding: 10px;
  }

  &__lang-icon {
    margin-right: 10px;
    border-radius: 10px;
  }

  &__lang-name {
    font-size: 10px;
    color: $color-violet-600;
  }

  &__description {
    padding: 20px;
  }

  &__statistics {
    p {
      margin-bottom: 0;
      font-size: 12px;
    }
  }
}
</style>
