<template>
  <section>
    <v-parallax class="parallax" src="/img/bg.jpg" height="700"
      ><v-container class="parallax__container" :fluid="false"
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
              <AntHiveBtn fill class="mx-0 mt-1 mr-1">{{
                $t("buttonJoin")
              }}</AntHiveBtn>
              <AntHiveBtn :fill="$vuetify.breakpoint.smAndDown" :primary="$vuetify.breakpoint.smAndDown"  class="mt-1">{{ $t("buttonSandbox") }}</AntHiveBtn>
            </div></v-col
          ><v-col></v-col></v-row></v-container
    ></v-parallax>
  </section>
</template>

<script>
export default {
  data: () => ({
    isPlaying: true
  }),
  mounted() {},
  components: {},
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
  &__container {
    @media screen and (max-width: 800px) {
      position: absolute;
      top: 30px;
    }
  }
}
</style>
