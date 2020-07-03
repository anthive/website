<template>
  <section class="feature-section">
    <v-container class="pt-12">
      <v-row class="feature-section__layout my-5 justify-center">
        <v-col cols="12" md="4" my="5">
          <v-card height="570" max-width="340" class="feature-section__feature elevation-2 white">
            <v-row class="pa-3">
              
              <v-col cols="12" sm="12">
                <v-card-title class="pt-0">
                  <div class="f-rubic f-text-large primary--text">
                    {{ $t("home.feature1Title") }}
                  </div>
                </v-card-title>
                 <v-card-text class="f-rubic f-text-small primary--text pr-12">{{
                  $t("home.feature1Text")
                }}</v-card-text>
              </v-col>
            </v-row>
			<div class="feature-section__feature-bg feature-section__feature-bg-1"></div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" my="5">
          <v-card height="570" max-width="340" class="feature-section__feature elevation-2 white">
            <v-row class="align-center justify-center pa-3">
             
              <v-col cols="12" sm="12">
                <v-card-title class="pt-0">
                  <div class="f-rubic f-text-large primary--text">
                    {{ $t("home.feature2Title") }}
                  </div>
                </v-card-title>
                 <v-card-text class="f-rubic f-text-small primary--text pr-12">{{
                  $t("home.feature2Text")
                }}</v-card-text>
              </v-col>
            </v-row>
			<div class="feature-section__feature-bg feature-section__feature-bg-2"></div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" my="5">
          <v-card height="570" max-width="340" class="feature-section__feature elevation-2 white">
            <v-row class="align-center justify-center pa-3">
              
              <v-col cols="12" sm="12">
                <v-card-title class="pt-0">
                  <div class="f-rubic f-text-large primary--text">
                    {{ $t("home.feature3Title") }}
                  </div>
                </v-card-title>
                <v-card-text class="f-rubic f-text-small primary--text pr-12"
                  >{{ $t("home.feature3Text") }}
                </v-card-text>
              </v-col>
            </v-row>
			<div class="feature-section__feature-bg feature-section__feature-bg-3"></div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>


<script>
export default {
  data: () => ({}),
  mounted() {},
  components: {}
}
</script>

<style lang="scss" scope>
.container {
  @media only screen and (min-width: 1200px) {
    max-width: 1300px;
  }
  @media only screen and (max-width: 1200px) {
    max-width: 1300px;
  }
}
.feature-section {
  background-color: #f6f6f8;
  clip-path: polygon(0% 3.49vw, 100% 0%, 100% 100%, 0% 100%);
  margin-top: -48px;
  &__layout {
    @media screen and (max-width: 960px) {
      flex-direction: column;
      margin: auto;
    }
  }
  &__feature {
    position: relative;
    @media screen and (max-width: 960px) {
      margin: auto;
    }
  }
  &__feature:hover {
    box-shadow: 0 3px 20px 7px rgba(225, 86, 124, 0.15) !important;
  }
  &__feature-bg {
    clip-path: polygon(-1% 3.49vw, 101% 0%, 101% 101%, -1% 101%);
    height: 220px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  &__feature-bg-1 {
    background: url('/img/ant_ml.jpg') center no-repeat;
    background-size: contain;
    background-color: #007588;
  }
  &__feature-bg-2 {
    background: url('/img/ant_engineer_red.jpg') center no-repeat;
    background-size: contain;
    background-color: #ff7f55;
  }
  &__feature-bg-3 {
    background: url('/img/ant_racing.jpg') center no-repeat;
    background-size: contain;
    background-color: #007588;
  }
}
</style>
