<template>
  <section class="my-12">
    <v-row class="align-center justify-space-around ma-0 pa-0">
      <v-col cols="12" lg="6">
        <v-card class="badges__card elevation-0 white pa-2 pl-4">
          <v-card-title class="layout" primary-title>
            <div class="f-rubik f-title primary--text text-center">
              {{ $t("homePage.badgesTitle") }}
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
        <v-img src="/img/badges_trinity.png" aspect-ratio="1" contain />
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
.badges {
  &__card {
    background-color: #fafafa !important;
  }
}
</style>
