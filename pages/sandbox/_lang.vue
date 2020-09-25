<template>
  <section class="texture-arrows sandbox">
    <v-row class="mx-2">
      <v-col cols="12">
        <v-card class="white pa-3 elevation-6" min-height="700">
          <v-card-title class="primary--text">{{ "Sandbox" }}</v-card-title>
          <v-row>
            <v-col class="sandbox__content" cols="12" md="6">
              <editor :valueCode.sync="valueCode" />
            </v-col>
            <v-col cols="12" md="6">
              <div id="player" />
              <AntHiveBtn
                :loading="loading"
                fill
                class="my-5"
                @click="onClickRun"
                block
                color="green"
                dark
                >Run sandbox </AntHiveBtn
              >
            </v-col>
          </v-row>
          <v-tabs
            v-if="simLogs && botLogs"
            v-model="tab"
            background-color="grey darken-2"
            dark
          >
            <v-tab> Simulation </v-tab>
            <v-tab> Bot </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card class="sandbox__content-logs-wrap" flat>
                <v-card-text>
                  <pre>{{ simLogs }}</pre>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="sandbox__content-logs-wrap" flat>
                <v-card-text>
                  <pre>{{ botLogs }}</pre>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import editor from '@/components/SandboxEditor.vue'
import axios from 'axios'
export default {
  components: {
    editor
  },
  data: () => ({
    valueCode: {},
    simLogs: '',
    botLogs: '',
    tab: 0,
    loading: false
  }),
  mounted() {
    const gameId = this.$route.query.box
    if (gameId) {
      this.initGame(gameId)
    }
  },
  methods: {
    async onClickRun() {
      this.loading = true
      const file = this.createFile()
      const formData = this.createData(file)
      try {
        const gameId = await this.sendCodeToSim(formData)
        this.initGame(gameId)
        this.initLogs(gameId)
        this.$router.push({ path: this.$route.path, query: { box: gameId } })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
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
    async sendCodeToSim(data) {
      const url = `${process.env.SIMULATION_URL}${this.valueCode.extention}`
      const simResp = await axios({
        method: 'post',
        url,
        data,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return simResp.data
    },
    initGame(id) {
      const gameUrl = `${process.env.SANDBOX_BUCKET}${id}.zip`
      // eslint-disable-next-line
      new AnthivePlayer('#player', gameUrl)
    },
    async initLogs(id) {
      this.botLogs = await this.getLogs(id, 'bot')
      this.simLogs = await this.getLogs(id, 'sim')
    },
    async getLogs(id, type) {
      const logsUrl = `${process.env.SANDBOX_BUCKET}${id}-${type}.txt`
      const resp = await axios.get(logsUrl)
      return resp.data
    }
  }
}
</script>
<style lang="scss" scoped>
.sandbox {
  overflow-x: hidden;
  height: 100%;
  &__content {
    position: relative;
    height: 600px;
  }
  &__content-logs-wrap {
    overflow-y: scroll;
    max-height: 450px;
  }
}
</style>
