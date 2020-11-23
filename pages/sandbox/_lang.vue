<template>
  <section class="sandbox page-wrap">
    <v-row class="px-2">
      <v-col class="pa-0" cols="12">
        <div class="white pa-3 pb-10" min-height="calc(100vh - 64px)">
          <ThePageHeader
            :title="$t('sandbox.sandbox')"
            :tooltip-text="$t('sandbox.tooltipText')"
          />
          <v-row>
            <v-col class="sandbox__content" cols="12" md="6">
              <editor :valueCode.sync="valueCode" />
            </v-col>
            <v-col cols="12" md="6">
              <div class="sandbox__player" :class="{ disable: loading }">
                <div id="player" />
                <div class="sandbox__loading-text" v-if="loading && $route.query.box">
                  <h4>{{ $t("sandbox.loading") }}</h4>
                  <p v-if="loadingText">{{ $t(`sandbox.${loadingText}`) }}</p>
                </div>
              </div>
              <div class="sandbox__actions">
                <AntHiveBtn
                  :loading="loading"
                  :disabled="!isCodeChanged"
                  fill
                  tile
                  class="action-button"
                  @click="onClickRun"
                  :light="!isCodeChanged"
                  color="green"
                  >{{ $t("sandbox.runSandbox") }}</AntHiveBtn
                >
                <AntHiveBtn
                  fill
                  tile
                  light
                  :disabled="!gameId"
                  class="action-button"
                  @click="onClickLogin"
                  color="accent"
                  ><span v-if="getUser && getUser.userName">{{ $t("sandbox.loginToSave") }}</span><span v-else> {{ $t("sandbox.loginToSave") }}</span></AntHiveBtn
                >
              </div>
              
              <div v-if="simLogs && botLogs">
                <v-tabs v-model="tab" background-color="grey darken-2" dark>
                  <v-tab @click="handlerClickLogs('bot')"> {{ $t("sandbox.bot") }} </v-tab>
                  <v-tab @click="handlerClickLogs('sim')"> {{ $t("sandbox.sim") }} </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <v-card class="sandbox__content-logs-wrap" flat>
                      <v-card-text>
                        <pre>{{ botLogs }}</pre>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-card class="sandbox__content-logs-wrap" flat>
                      <v-card-text>
                        <pre>{{ simLogs }}</pre>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </div>
              <div v-else>
                <p class="sandbox__description">{{ $t("sandbox.description") }}</p>
                <p v-html="getHelpElement" />
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import editor from '@/components/SandboxEditor.vue'
import ThePageHeader from '@/components/ThePageHeader'
import axios from 'axios'
var player = null
export default {
  head() {
    return {
      title: this.$t('sandbox.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('sandbox.meta.description')
        }
      ]
    }
  },
  components: {
    editor,
    ThePageHeader
  },
  data: () => ({
    valueCode: {},
    simLogs: '',
    botLogs: '',
    tab: 0,
    loading: false,
    listOfLoadingText: ['loadingText1', 'loadingText2', 'loadingText3', 'loadingText4', 'loadingText5'],
    loadingText: '',
    savedCode: '',
    gameId: ''
  }),
  computed: {
    ...mapGetters(['getUser']),
    isCodeChanged() {
      return this.valueCode.value !== this.savedCode
    },
    getHelpElement() {
      const text = this.$t('sandbox.descriptionHelp')
      const rulesElement = `
        <a
          class="accent--text"
          onClick="$ga.event({ eventCategory: 'rules', eventAction: 'redirect', eventLabel: 'fromSandbox' })"
          href="/rules"
        >${this.$t('header.rules')}</a>
      `
      const discordElement = `<a class="accent--text" target="_blank" href="https://discord.gg/3Z7KvYv">Discord</a>`
      return text.replace('$rules$', rulesElement).replace('$discord$', discordElement)
    }
  },
  async mounted() {
    import('../../static/js/anthive-5.0.js').then(async () => {
      if (this.$route.query.box) {
        this.gameId = this.$route.query.box
        this.loading = true
        this.showLoadingText()
        await this.getGame()
          .then(() => {
            this.initGame()
            this.initLogs()
          })
          .catch(err => {
            this.botLogs = this.simLogs = err
          })
          .finally(() => {
            this.loading = false
          })
      }
    })
  },
  methods: {
    handlerClickLogs(logsCategory) {
      this.$ga.event({ eventCategory: 'game', eventAction: 'logs', eventValue: logsCategory })
    },
    showLoadingText(i = 0) {
      if (!this.loading) {
        this.loadingText = ''
        return
      }
      if (i >= this.listOfLoadingText.length) return
      setTimeout(() => {
        this.loadingText = this.listOfLoadingText[i]
        this.showLoadingText(i + 1)
      }, 3000)
    },
    async onClickRun() {
      this.loading = true
      this.$ga.event({ eventCategory: 'sandbox', eventAction: 'run' })
      this.showLoadingText()
      if (player && player.control) player.control.stop()
      this.botLogs = this.simLogs = 'Loading...'
      this.savedCode = this.valueCode.value

      const file = this.createFile()
      const formData = this.createData(file)

      const gameResp = await this.sendCodeToSim(formData)
      this.gameId = gameResp.id

      await this.getGame()
        .then(() => {
          this.initGame()
          this.initLogs()
        })
        .catch(err => {
          this.botLogs = this.simLogs = err
        })
        .finally(() => {
          this.$router.push({ path: this.$route.path, query: { box: this.gameId } })
          this.loading = false
        })
    },
    onClickLogin() {
      this.$ga.event({ eventCategory: 'getstarted', eventAction: 'redirect', eventLabel: 'sandbox' })
      const createBotUrl = `${process.env.PROFILE_URL}/create-bot?box=${this.gameId}&lang=${this.$route.params.lang}`
      window.location.href = createBotUrl
    },
    createFile() {
      const fileName = `bot.${this.valueCode.extention}`
      const blob = new Blob([this.valueCode.value])
      return new File([blob], `${fileName}`)
    },
    createData(file) {
      const data = new FormData()
      data.append('file', file)
      return data
    },
    async getGame() {
      return await new Promise(async (resolve, reject) => {
        const gameUrl = `${process.env.SANDBOX_STORAGE}/${process.env.SIM_VERSION}/${this.gameId}.zip`

        axios
          .head(gameUrl)
          //if got the game, then we resolve
          .then(resolve)
          .catch(() => {
            const maxTime = 60000
            const callInterval = 5000
            let passedTime = 0

            const interval = setInterval(async () => {
              passedTime += callInterval
              //if got 404, create calls by interval until we get 200 status and resolve,
              axios.head(gameUrl).then(() => {
                clearInterval(interval)
                resolve()
              })
              //or overcome the maximum interval, then reject
              if (passedTime >= maxTime) {
                clearInterval(interval)
                reject('Please try again later')
              }
            }, callInterval)
          })
      })
    },
    async sendCodeToSim(data) {
      const url = `${process.env.SANDBOX_API_URL}/${this.valueCode.extention}`
      const simResp = await axios({
        method: 'post',
        url,
        data,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return simResp.data
    },
    initGame() {
      const gameUrl = `${process.env.SANDBOX_STORAGE}/${process.env.SIM_VERSION}/${this.gameId}.zip`
      // eslint-disable-next-line
      player = new AnthivePlayer('#player', gameUrl)
    },
    async initLogs() {
      this.botLogs = await this.getLogs(this.gameId, 'bot')
      this.simLogs = await this.getLogs(this.gameId, 'sim')
    },
    async getLogs(id, type) {
      const logsUrl = `${process.env.SANDBOX_STORAGE}/${process.env.SIM_VERSION}/${id}-${type}.txt`
      const resp = await axios.get(logsUrl)
      return resp.data
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.sandbox {
  overflow-x: hidden;
  height: 100%;
  &__content {
    position: relative;
  }
  &__player {
    position: relative;
    &.disable::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $color-black;
      opacity: 0.5;
    }
  }
  &__description {
    white-space: pre-line;
  }
  &__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 20px;

    .action-button {
      width: 49%;
    }
  }
  &__loading-text {
    position: absolute;
    z-index: 1;
    color: $color-white;
    top: 50%;
    text-align: center;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__content-logs-wrap {
    overflow-y: scroll;
    max-height: 420px;
  }
}
</style>
