<template>
  <div class="debug-panel">
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark>
      <v-tabs-slider />
      <div
        v-for="(bot, index) in getBots"
        :key="index"
      >
        <v-tab
          v-show="!sandboxBotLogs"
          class="tab"
          active-class="active"
          @click="$gtag('event', 'sandbox_bot_tab')"
        >
          <v-avatar
            v-if="!bot.displayName.includes('sandbox')"
            class="avatar"
            tile
            size="20"
          ><v-img :src="getBotAvatar(bot, 100)" />
          </v-avatar>
          <span>{{ bot.displayName }} {{ bot.id }}</span>
        </v-tab>
      </div>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <div v-for="(bot, index) in getBots" :key="index + 10">
        <v-tab-item :transition="false" :reverse-transition="false">
          <div class="d-flex flex-wrap">
            <div class="tab-content">
              <div class="tab-title">
                {{ $t('game.request') }}
                <AntHiveIcon
                  v-if="isGameStoped"
                  icon="download"
                  class="download"
                  @click="downloadRequest(getResponseRequest(bot, 'requests'), bot.id)"
                />
              </div>
              <div class="tab-text">
                {{ getResponseRequest(bot, "requests") }}
              </div>
            </div>
            <div class="tab-content response">
              <div class="tab-title">{{ $t('game.response') }}</div>
              <div>
                <pre class="tab-text">{{
                  JSON.stringify(getResponseRequest(bot, "responses"), null, 2)
                }}</pre>
              </div>
            </div>
            <div v-if="sandboxBotLogs" class="tab-content">
              <div class="tab-title">{{ $t('game.logs') }}</div>
              <div>
                <pre class="tab-text">{{
                  sandboxBotLogs
                }}</pre>
              </div>
            </div>
            <div v-else class="tab-content">
              <div class="tab-title">{{ $t('game.logs') }}</div>
              <div>
                <pre class="tab-text">{{
                  currentBotLogs
                }}</pre>
              </div>
            </div>
          </div>
        </v-tab-item>
      </div>
    </v-tabs-items>

    <div v-if="!getBots.length && sandboxBotLogs" class="d-flex">
      <div class="log-tab-content">
        <div class="tab-title">
          {{ $t('game.logs') }}
        </div>
        <div class="tab-text">
          {{ sandboxBotLogs }}
        </div>
      </div>
    </div>

    <div v-if="!getBots.length && !sandboxBotLogs" class="d-flex">
      <div class="log-tab-content">
        <div class="tab-title">
          {{ $t('game.logs') }}
        </div>
        <div class="tab-text">
          {{ currentBotLogs }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Image from '@/mixins/image'
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  components: {
    AntHiveIcon
  },
  mixins: [Image],
  props: {
    requests: { type: Array, required: true },
    responses: { type: Array, required: true },
    bots: { type: Array, required: true },
    isGameStoped: { type: Boolean, default: false },
    sandboxBotLogs: {
      type: String,
      default: ''
    },
    gameSha: {
      type: String,
      required: true
    }
  },
  data: () => ({
    tab: 0,
    currentBotLogs: null
  }),
  computed: {
    getBots() {
      if (this.bots && this.bots.length) {
        return this.bots
      }
      return []
    }
  },
  watch: {
    tab() {
      if (!this.sandboxBotLogs) {
        this.getBotLogs()
      }
    }
  },
  async mounted() {
    if (!this.sandboxBotLogs) {
      await this.getBotLogs()
    }
  },
  methods: {
    getResponseRequest(bot, type) {
      // this[type] - requests/responses from props
      if (this[type] && this[type].length) {
        const botLog = this[type].find(r => r.id === bot.id)

        if (!botLog) {
          return ''
        }

        const orders = { orders: botLog.orders }
        const logContent = type === 'responses' ? orders : botLog
        return logContent
      }
    },
    async getBotLogs() {
      const currentBot = this.bots[this.tab]
      if (!currentBot) { return }

      const currentBotId = currentBot.id
      const url = `${process.env.LOGS_STORAGE}/${process.env.SIM_VERSION}/${this.gameSha}-${currentBotId}.txt`
      const resp = await axios.get(url)
      this.currentBotLogs = resp.data
    },
    downloadRequest(request, id) {
      this.$gtag('event', 'download_request')
      const a = document.createElement('a')
      const data = JSON.stringify(request)
      a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }))
      a.download = `request-${id}`
      a.click()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/global.scss';
.tab-content {
  &::-webkit-scrollbar {
    width: 15px;
    background: $lilac;
  }
  &::-webkit-scrollbar-thumb {
    border: 5px solid $lilac;
    background: $violet-light;
  }
}

.debug-panel .v-tabs-slider-wrapper {
  display: none;
}
</style>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.debug-panel {
  font-size: $font-small;
  &.v-tabs-slider-wrapper {
    display: none;
  }
  .active {
    background-color: $violet-light;
  }
  .download {
    cursor: pointer;
    background-color: $violet !important;
    margin-bottom: -5px;
    margin-left: 27px;
  }
  .tab {
    text-transform: none;
    height: 100%;
  }
  .tab-content {
    color: $violet;
    height: 296px;
    width: 100%;
    flex: 2;
    overflow-y: auto;
    border-right: 2px solid $violet;
    &.response {
      flex: 1;
    }
     @media screen and (max-width: $screen-md) {
        flex: none!important;
      }
  }

  .log-tab-content {
    width: 100%;
    color: $violet;
    height: 296px;
    overflow-y: auto;
    border-right: 2px solid $violet;
    background-color: $white;
  }

  .tab-title {
    font-size: $font-medium;
    font-weight: 600;
    background-color: $violet-light;
    color: $violet;
    padding-left: 10px;
  }
  .tab-text {
    padding: 10px;
  }
  .avatar {
    border: 1px solid white;
    margin-right: 10px;
    box-sizing: content-box;
  }
}
</style>
