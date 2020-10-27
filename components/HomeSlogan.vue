<template>
  <section>
    <div class="header-section">
      <v-container>
        <v-row class="header-section__content">
          <v-col class="mb-4" cols="12" md="6">
            <img src="/img/boy.webp" width="100%" />
          </v-col>
          <v-col class="header-section__text-content" cols="12" md="5">
            <h1 class="f-title mb-4 f-montserrat primary--text">
              {{ $t("home.title") }}
            </h1>
            <h2 class="f-text f-montserrat primary--text font-weight-medium">
              {{ $t("home.description") }}
            </h2>
            <div class="header-section__actions">
              <AntHiveBtn large tile class="mr-4" color="action" :to="localePath('sandbox')">{{
                $t("header.sandbox")
              }}</AntHiveBtn>
              <AntHiveBtn large tile color="accent" @click="handlerClickGetStarted">{{
                $t("header.buttonJoin")
              }}</AntHiveBtn>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="bg-ornament" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeSlogan',
  data: () => ({
    profileURL: process.env.PROFILE_URL
  }),
  methods: {
    handlerClickGetStarted() {
      this.$ga.event({ eventCategory: 'getstarted', eventAction: 'redirect', eventLabel: 'homepage' })
      window.location.href = this.profileURL
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.container {
  @media only screen and (min-width: 1200px) {
    max-width: 1300px;
  }
}

.header-section {
  &__text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 40px;
  }
  &__actions {
    margin-top: 20px;
  }
  .bg-ornament {
    position: absolute;
    width: 535px;
    right: -300px;
    height: 640px;
    top: 260px;
    background: url(/img/bg-ornament.svg);
  }
}
</style>
