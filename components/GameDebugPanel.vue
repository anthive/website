<template>
  <div class="debug-panel">
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tabs-slider />
      <v-tab v-if="simLogs" class="tab" @click="$gtag('event', 'sandbox_sim_logs')">Sim Logs</v-tab>
      <v-tab v-if="sandboxBotLogs" class="tab" @click="$gtag('event', 'sandbox_bot_logs')">Bot Logs</v-tab>
      <v-tab
        v-for="(bot, index) in getBots"
        :key="index"
        active-class="active"
        class="tab"
        @click="$gtag('event', 'sandbox_bot_tab')"
      ><v-avatar
        v-if="!bot.displayName.includes('sandbox')"
        class="avatar"
        tile
        size="20"
      ><v-img :src="getAvatar(bot.avatar, 100)" /></v-avatar
      ><span>{{ bot.displayName }} {{ bot.id }}</span></v-tab
      >
    </v-tabs>

    <v-tabs-items v-model="tab">
      <div v-for="(bot, index) in getBots" :key="index + 10">
        <v-tab-item v-if="simLogs" :transition="false" :reverse-transition="false">
          <div class="tab-text">
            <pre>{{ simLogs }}</pre>
          </div>
        </v-tab-item>

        <v-tab-item v-if="sandboxBotLogs" :transition="false" :reverse-transition="false">
          <div class="tab-text">
            <pre>{{ sandboxBotLogs }}</pre>
          </div>
        </v-tab-item>
        <v-tab-item :transition="false" :reverse-transition="false">
          <div class="d-flex">
            <div class="tab-content">
              <div class="tab-title">
                Request
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
            <div class="tab-content">
              <div class="tab-title">Response</div>
              <div>
                <pre class="tab-text">{{
                  JSON.stringify(getResponseRequest(bot, "responses"), null, 2)
                }}</pre>
              </div>
            </div>
          </div>
        </v-tab-item>
      </div>
    </v-tabs-items>
  </div>
</template>

<script>
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
    simLogs: {
      type: String,
      default: ''
    },
    sandboxBotLogs: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    tab: 0
  }),
  computed: {
    getBots() {
      if (this.bots && this.bots.length) {
        const bots = this.bots
        return bots.sort((a, b) => {
          if (a.id > b.id) {
            return 1
          }
          if (a.id < b.id) {
            return -1
          }
          return 0
        })
      }
      return []
    }
  },
  methods: {
    getResponseRequest(bot, type) {
      // this[type] - requests/responses from props
      if (this[type] && this[type].length) {
        return this[type].find(r => r.id === bot.id)
      }
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
    padding-top: 5px;
  }
  .tab-content {
    color: $violet;
    width: 40%;
    height: 296px;
    overflow-y: auto;
    &:first-child {
      width: 60%;
      border-right: 2px solid $violet;
    }
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
