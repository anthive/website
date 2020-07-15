<template>
  <section>
    <div class="header-section" height="500"
      ><v-container class="parallax__container" :fluid="false"
        ><v-row class="justify-center align-start"
          ><v-col class="mb-4" cols="12" md="6"
            ><h1
              class="mb-5 mt-0 f-title f-rubik primary--text"
            >
              {{ $t("home.slogan1") }}
            </h1>
            <v-col class="pa-0" cols="6"><h2 class="f-text f-rubik primary--text font-weight-medium">
              {{ $t("home.slogan2") }}
            </h2></v-col>
            
            <div class="mt-3">
              <AntHiveBtn color="accent" to="/sandbox" class="mx-0 mt-3 mr-1">{{
                $t("home.sandbox")
              }}</AntHiveBtn>
              <!-- <AntHiveBtn :to="'/sandbox'" :fill="$vuetify.breakpoint.smAndDown" :primary="$vuetify.breakpoint.smAndDown"  class="mt-3">{{ $t("home.buttonSandbox") }}</AntHiveBtn> -->
            </div></v-col
          ><v-col></v-col></v-row></v-container
    ></div>
  </section>
</template>

<script>
export default {
  data: () => ({
    isPlaying: true
  })
}
</script>

<style lang="scss" scoped>
.container {
  @media only screen and (min-width: 1200px) {
    max-width: 1300px;
  }
}
.header-section {
  background: url('/img/bg.webp') 50% 110%;
  background-size: cover;
  padding: 100px 20px 140px;
  position: relative;
  transition: clip-path 0.2s ease-out, padding-top 0.2s ease-out, padding-bottom 0.2s ease-out;
  will-change: clip-path, padding-top, padding-bottom;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}
</style>
