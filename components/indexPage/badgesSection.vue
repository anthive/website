<template>
  <section class="badges">
    <v-row class="align-center justify-space-around ma-0 pa-0">
      <v-col cols="12" lg="6">
        <v-card class="badges__card elevation-0 white pa-2 pl-4">
          <v-card-title class="layout" primary-title>
            <div class="f-rubik f-subtitle primary--text text-center">
              {{ $t("home.badgesTitle") }}
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
        <v-img src="/img/badges_trinity.png" aspect-ratio="1" contain />
      </v-col>
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.badges {
  padding: 80px 0;
  clip-path: polygon(0% 3.49vw, 100% 0%, 100% 100%, 0% 100%);
  margin-top: -85px;
  background-color: $color-grey-10;
  &__card {
    background-color: transparent !important;
  }
}
</style>
