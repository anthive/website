<template>
  <v-footer
    class="footer texture-arrows pa-4 elevation-2 d-flex justify-space-around"
    app
    tag="footer"
    absolute
  >

    <!-- Copyright -->
    <div col="12" md="3" class="footer__copyright f-rubik">
      <span>AntHive.IO &copy; {{ new Date().getFullYear() }}</span>
    </div>

    <!-- PP and TOS links -->
    <div col="12" md="3" class="footer__subscribe f-rubik">
      <span class="mr-2">
        <nuxt-link class="accent--text ml-1" to="/tos">
          {{ $t("footer.termsofService") }}
        </nuxt-link>

        {{ $t("footer.and") }}

        <nuxt-link class="accent--text" to="/pp">
          {{ $t("footer.privacyPolicy") }}
        </nuxt-link>
      </span>
    </div>

    <!-- Report issue -->
    <div col="12" md="3" class="footer__issue f-rubik">
      <a
        href="https://github.com/anthive/website/issues"
        target="_blank"
        rel="noreferrer"
        class="accent--text ml-1"
        >{{ $t("footer.report") }}</a
      >
    </div>

    <!-- Social networks icons -->
    <div col="12" md="2" class="footer__social">
      <a
        href="https://twitter.com/anthiveio"
        title="Our Twitter page"
        rel="noreferrer"
        target="_blank"
      >
        <v-icon class="footer__social--icon">mdi-twitter</v-icon>
      </a>
      <a
        href="https://www.facebook.com/AntHive.IO/"
        title="Our Facebook page"
        rel="noreferrer"
        target="_blank"
      >
        <v-icon class="footer__social--icon">mdi-facebook</v-icon>
      </a>
      <a
        href="https://www.instagram.com/anthiveio/"
        title="Our Instagram accoutn"
        rel="noreferrer"
        target="_blank"
      >
        <v-icon class="footer__social--icon">mdi-instagram</v-icon>
      </a>
      <a
        href="https://www.youtube.com/channel/UCx1KBAlciwcRuehIiOfnDVg"
        title="Our Youtube channel"
        rel="noreferrer"
        target="_blank"
      >
        <v-icon class="footer__social--icon">mdi-youtube</v-icon>
      </a>
      <a
        href="https://www.twitch.tv/anthiveio"
        title="Our Twitch accoutn"
        rel="noreferrer"
        target="_blank"
      >
        <v-icon class="footer__social--icon">mdi-menu-up</v-icon>
      </a>
    </div>

    <!-- Languagues -->
    <div col="12" md="2" class="footer__locale-select">
      <v-select
        v-model="selectedLocale"
        class="footer__locale-select"
        :items="locales"
        prepend-icon="mdi-earth"
        dense
        dark
        flat
        hide-details
        :menu-props="{ top: true, offsetY: true }"
        @input="switchLocale"
      ></v-select>
    </div>

  </v-footer>
</template>

<script>
export default {
  name: 'defaultFooter',
  data: () => ({
    locales: ['English', 'Русский'],
    selectedLocale: ''
  }),
  created() {
    this.selectedLocale = this.$i18n.locale === 'en' ? this.locales[0] : this.locales[1]
  },
  methods: {
    switchLocale(locale) {
      let localeParam
      switch (locale) {
        case 'English':
          localeParam = 'en'
          break
        case 'Русский':
          localeParam = 'ru'
          break
      }
      this.$router.push(this.switchLocalePath(localeParam))
    }
  }
}
</script>
<style>
.footer__locale-select .v-input__slot:before,
.footer__locale-select .v-input__slot:after {
  display: none;
}
</style>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.footer {
  margin-top: 30px;
  @media screen and (max-width: $screen-md) {
    flex-direction: column;
  }
  &__locale-select {
    max-width: 170px;
    margin: 1px 0 2px;
  }
  &__social {
    margin-top: -3px;
  }
  &__social--icon {
    margin: 0 5px;
    color: $color-white !important;
  }
  &__copyright,
  &__subscribe,
  &__issue,
  &__social,
  &__locale-select {
    color: $color-white;
    text-align: center;
    padding: 0 7px;
    @media screen and (max-width: $screen-lg) {
      margin: 3px 0;
    }
  }
}
</style>
