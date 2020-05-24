<template>
  <section>
    <v-parallax src="/img/pre-footer.jpg" height="300"></v-parallax>
    <v-row class="mx-2">
      <v-col cols="12">
        <v-card class="white pa-3 elevation-6 rules__card" min-height="700">
          <v-card-title class="primary--text">{{ "Sandbox" }}</v-card-title>
          <v-row>
            <v-col class="conte" cols="12" md="6">
              <editor :valueCode.sync="valueCode"></editor>
            </v-col>
            <v-col cols="12" md="6">
              <div id="player"></div>
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
import editor from '@/components/editor.vue'
export default {
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
  },
  components: {
    editor
  }
}
</script>
<style>
.conte {
  position: relative;
  height: 600px;
}
.rules__card {
  margin-top: -250px;
}

.white-space {
  white-space: pre-line;
}
</style>
