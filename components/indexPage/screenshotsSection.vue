<template>
  <section class="creenshots">
    <v-row class="align-center justify-space-around mx-0 pa-0">
      <v-col cols="12" lg="6">
        <v-card class="creenshots__card elevation-0 white mt-10 pa-2 pl-4">
          <v-card-title class="layout" primary-title>
            <div class="f-rubik f-title primary--text text-center">
              {{ $t("homePage.screenshot1Title") }}
            </div>
          </v-card-title>
          <v-card-text class="f-rubik f-text primary--text"
            ><p>{{ $t("homePage.badgesText1") }}</p>
            <p>{{ $t("homePage.badgesText2") }}</p>
            <p>{{ $t("homePage.badgesText3") }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10" lg="3" sm="6" md="5">
        <v-img  class="mt-10 elevation-6" src="/img/screen1.png" aspect-ratio="1" contain />
      </v-col>
    </v-row>
    <v-container> <hr class="left-to-right-line"></v-container>
    <v-row class="align-center justify-space-around mx-0 pa-0">
         <v-col cols="10" lg="3" sm="6" md="5">
        <v-img class="elevation-6" src="/img/screen2.png" aspect-ratio="1" contain />
      </v-col>
      <v-col class="" cols="12" lg="6">
        <v-card class="creenshots__card elevation-0 white pa-2 pl-4">
          <v-card-title class="layout" primary-title>
            <div class="f-rubik f-title primary--text text-center">
              {{ $t("homePage.screenshot2Title") }}
            </div>
          </v-card-title>
          <v-card-text class="f-rubik f-text primary--text"
            ><p>{{ $t("homePage.badgesText1") }}</p>
            <p>{{ $t("homePage.badgesText2") }}</p>
            <p>{{ $t("homePage.badgesText3") }}</p>
          </v-card-text>
        </v-card>
      </v-col>
     <v-container> <hr class="right-to-left-line"></v-container>
    </v-row>
    <v-row class="align-center justify-space-around mx-0 pa-0">
      <v-col class=".right-to-left-line" cols="12" lg="6">
        <v-card class="creenshots__card elevation-0 white pa-2 pl-4">
          <v-card-title class="layout" primary-title>
            <div class="f-rubik f-title primary--text text-center">
              {{ $t("homePage.screenshot3Title") }}
            </div>
          </v-card-title>
          <v-card-text class="f-rubik f-text primary--text"
            ><p>{{ $t("homePage.badgesText1") }}</p>
            <p>{{ $t("homePage.badgesText2") }}</p>
            <p>{{ $t("homePage.badgesText3") }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10" lg="3" sm="6" md="5">
        <v-img class="elevation-6" src="/img/screen3.png" aspect-ratio="1" contain />
      </v-col>
    </v-row>
  </section>
</template>


<script>
export default {
  data: () => ({}),
  mounted() {},
  components: {}
}
</script>

<style lang="scss" scoped>
.creenshots {
  clip-path: polygon(0% 3.49vw, 100% 0%, 100% 100%, 0% 100%);
  background: white;
  margin-top: -66px;
  padding-bottom: 100px;
  &__card {
  }
}
</style>
