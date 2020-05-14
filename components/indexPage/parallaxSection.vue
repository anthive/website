<template>
  <section>
    <v-parallax class="parallax" src="/img/bg-test.jpg" height="700"
      ><v-container :fluid="false"
        ><v-row class="justify-center align-start"
          ><v-col class="mb-4" cols="12" md="6"
            ><div
              class="mb-5 mt-0 f-title f-rubik primary--text font-weight-bold"
            >
              {{ $t("slogan1") }}
            </div>
            <div class="f-text f-rubik primary--text">
              {{ $t("slogan2") }}
            </div>
            <div class="hidden-sm-and-down mt-2 f-text f-rubik primary--text">
              {{ $t("slogan3") }}
            </div>
            <div class="mt-3">
              <AntHiveBtn fill class="mx-0 mr-1">{{ $t("buttonJoin") }}</AntHiveBtn>
              <AntHiveBtn class="">{{ $t("buttonSandbox") }}</AntHiveBtn>
            </div></v-col
          ><v-col class="d-flex justify-center" md="6"
            ><div class="ant-player" id="player">
              <h2 class="loading">{{ $t("loading") }}</h2>
            </div></v-col
          ></v-row
        ></v-container
      ></v-parallax
    >
  </section>
</template>




<script>
import AntHiveBtn from '@/components/AntHiveBtn'
export default {
  data: () => ({
    isPlaying: true
  }),
  mounted() {
    const dataUrl = 'https://storage.googleapis.com/anthive-dev-games/Kj5A2SydOFlqgLIu35Br.zip'
    // eslint-disable-next-line
    new AnthivePlayer('#player', dataUrl)
  },
  components: {
    AntHiveBtn
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
  @media only screen and (min-width: 1200px) {
    max-width: 1300px;
  }
}
.parallax {
  position: relative;
  transition: clip-path 0.2s ease-out, padding-top 0.2s ease-out, padding-bottom 0.2s ease-out;
  will-change: clip-path, padding-top, padding-bottom;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}
.ant-player {
  box-shadow: 0 3px 20px -2px rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.14), 0 1px 20px 0 rgba(0, 0, 0, 0.12);
}
</style>
