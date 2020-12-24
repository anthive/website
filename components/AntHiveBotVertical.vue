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
    <p class="bot-title">{{ getBotName }}<span class="version">v {{ bot.v }}</span></p>
    <div class="stats">
      <div class="stats-row">
        <p>{{ $t("userInfo.games") }}:</p>
        <p class="value">{{ bot.games }}</p>
      </div>
      <div class="stats-row">
        <p>{{ $t("userInfo.wl") }}:</p>
        <p class="value">{{ bot.wins }}/{{ bot.losses }}</p>
      </div>
      <div class="stats-row">
        <p>{{ $t("userInfo.mmr") }}:</p>
        <p class="value">{{ bot.mmr }}</p>
      </div>
      <div class="stats-row">
        <p>{{ $t("userInfo.art") }}:</p>
        <p class="value">{{ bot.art }}</p>
      </div>
      <div class="stats-row">
        <p>{{ $t("userInfo.errors") }}:</p>
        <p class="value">{{ bot.errors }}%</p>
      </div>
    </div>
    <div class="layout">
      <AntHiveButton
        class="button"
        tile
        color="accent"
      >
        <AntHiveIcon icon="challange" class="mx-1" small color="white" />
        <span>{{ $t("userInfo.challangeMe") }}</span>
      </AntHiveButton>
    </div>
   </div>
 </div>
</template>

<script>
import langs from '../static/langs/data.json'
import Image from '@/mixins/image'
import Truncate from '@/mixins/truncate'
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'AntHiveBotVertical',
  components: {
    AntHiveIcon
  },
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
    },
    getBotName() {
      if (this.bot && this.bot.displayName) {
        return this.getStringTruncated(this.bot.displayName, 10)
      }
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
  height: 100%;
  max-height: 310px;
  background-color: $color-white;

  .img {
    background-position: center;
    width: 100%;
    min-height: 120px;
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
    height: 100%;
    position: relative;

    .layout {
      position: absolute;
      display: none;
      flex-direction: column;
      justify-content: flex-end;
      padding: 15px;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $color-black-transparent;
    }
  }

  &:hover {
    .layout {
      display: flex;
    }
  }

  .stats {
    .stats-row {
      display: flex;
      justify-content: space-between;
    }

    p {
      margin-bottom: 4px;
      font-size: $font-medium;
    }

    .value {
      font-weight: $font-weight-bold;
    }
  }

  .button {
    letter-spacing: 0;
  }
}
</style>
