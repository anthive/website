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
              <AntHiveBtn fill class="my-5" @click="onClickRun" block color="green" dark
                >Run sandbox</AntHiveBtn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import editor from '@/components/SandboxEditor.vue'
import axios from 'axios'
export default {
  data: () => ({
    valueCode: {},
    isPlaying: true,
    extentions: {
      golang: 'go',
      javascript: 'js',
      php: 'php',
      python: 'py',
      c_cpp: 'cpp'
    }
  }),
  mounted() {
    const dataUrl = 'https://storage.googleapis.com/anthive-dev-games/Kj5A2SydOFlqgLIu35Br.zip'
    // eslint-disable-next-line
    new AnthivePlayer('#player', dataUrl)
  },
  methods: {
    onClickRun() {
      const lang = this.valueCode.lang
      const text = this.valueCode.value

      const fileExt = this.extentions[lang]
      const fileName = `bot.${fileExt}`
      const file = this.createFile(fileName, text)

      const url = `https://5b2f7c032473.ngrok.io/sandbox/${fileExt}/${fileName}`

      const formData = this.createData(file)
      this.sendCodeToSim(url, formData)
    },
    createFile(fileName, text) {
      const blob = new Blob([text])
      return new File([blob], `${fileName}`)
    },
    createData(file) {
      const data = new FormData()
      data.append('file', file)
      return data
    },
    sendCodeToSim(url, data) {
      axios({
        method: 'post',
        url,
        data,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
  },
  components: {
    editor
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
}
</style>
