<template>
  <section class="sreenshots">
    <v-row class="align-center justify-space-around mx-0 pa-0">
      <v-col cols="12" lg="6">
        <v-card class="sreenshots__card elevation-0 white mt-10 pa-2 pl-4">
          <v-card-title class="layout" primary-title>
            <div class="f-rubik f-subtitle primary--text text-center">
              {{ $t("home.screenshot1Title") }}
            </div>
          </v-card-title>
          <v-card-text class="f-rubik f-text primary--text"
            ><p>{{ $t("home.badgesText1") }}</p>
            <p>{{ $t("home.badgesText2") }}</p>
            <p>{{ $t("home.badgesText3") }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10" lg="3" sm="6" md="5">
        <v-img class="sreenshots__img mt-10" src="/img/screen1.png" aspect-ratio="1" />
      </v-col>
    </v-row>
    <v-container> <hr class="left-to-right-line"></v-container>
    <v-row class="align-center justify-space-around mx-0 pa-0">
         <v-col cols="10" lg="3" sm="6" md="5">
        <v-img class="sreenshots__img " src="/img/screen2.png" aspect-ratio="1" />
      </v-col>
      <v-col class="" cols="12" lg="6">
        <v-card class="sreenshots__card elevation-0 white pa-2 pl-4">
          <v-card-title class="layout" primary-title>
            <div class="f-rubik f-subtitle primary--text text-center">
              {{ $t("home.screenshot2Title") }}
            </div>
          </v-card-title>
          <v-card-text class="f-rubik f-text primary--text"
            ><p>{{ $t("home.badgesText1") }}</p>
            <p>{{ $t("home.badgesText2") }}</p>
            <p>{{ $t("home.badgesText3") }}</p>
          </v-card-text>
        </v-card>
      </v-col>
     <v-container> <hr class="right-to-left-line"></v-container>
    </v-row>
    <v-row class="align-center justify-space-around mx-0 pa-0">
      <v-col class=".right-to-left-line" cols="12" lg="6">
        <v-card class="sreenshots__card elevation-0 white pa-2 pl-4">
          <v-card-title class="layout" primary-title>
            <div class="f-rubik f-subtitle primary--text text-center">
              {{ $t("home.screenshot3Title") }}
            </div>
          </v-card-title>
          <v-card-text class="f-rubik f-text primary--text"
            ><p>{{ $t("home.badgesText1") }}</p>
            <p>{{ $t("home.badgesText2") }}</p>
            <p>{{ $t("home.badgesText3") }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10" lg="3" sm="6" md="5">
        <v-img class="sreenshots__img " src="/img/screen3.png" aspect-ratio="1" />
      </v-col>
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.sreenshots {
  clip-path: polygon(0% 3.49vw, 100% 0%, 100% 100%, 0% 100%);
  background-color: $color-white;
  margin-top: -66px;
  padding: 50px 0 100px;
  &__img {
    border-radius: $border-radius-default;
    box-shadow: $box-shadow-default;
  }
}
</style>
