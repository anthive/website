<template>
  <section class="texture-arrows sandbox">
    <v-row class="mx-2">
      <v-col cols="12">
        <v-card class="white pa-3 elevation-6" min-height="700">
          <v-card-title class="primary--text">{{ "Sandbox" }}</v-card-title>
          <v-row>
            <v-col class="sandbox__content" cols="12" md="6">
              <SandboxEditor :valueCode.sync="valueCode" />
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
import SandboxEditor from '@/components/SandboxEditor.vue'
export default {
  components: {
    SandboxEditor
  },
  data: () => ({
    valueCode: {},
    isPlaying: true
  }),
  mounted() {
    const dataUrl = 'https://storage.googleapis.com/anthive-dev-games/Kj5A2SydOFlqgLIu35Br.zip'
    // eslint-disable-next-line
    new AnthivePlayer('#player', dataUrl)
  },
  methods: {
    onClickRun() {
      //   sebd in firebase
      console.log(this.valueCode)
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
}
</style>
