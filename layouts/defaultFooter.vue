<template>
  <v-footer
    class="footer texture-arrows pa-4 elevation-2 d-flex justify-space-around"
    app
    tag="footer"
    absolute
  >
    <div col="12" md="3" class="footer__copyright f-rubik text-center">
      <span>AntHive.IO</span>
      <span class="mx-2">
        Copyright&copy;, {{ new Date().getFullYear() }}
      </span>
      
    </div>

    <div col="12" md="3" class="footer__subscribe f-rubik text-center">
      <span class="mr-2"> {{ $t("ReadFooter") }} <nuxt-link class="accent--text" to="/tos">{{ $t("TermsofService") }}</nuxt-link> {{ $t("AndFooter") }} <nuxt-link class="accent--text" to="/pp">{{ $t("PrivacyPolicy") }}</nuxt-link></span>
      
    </div>
    <div col="12" md="3" class="footer__issue f-rubik text-center">
      <span>{{ $t("feedbackTitle2") }}</span>
      <AntHiveBtn
        href="https://visitor.r20.constantcontact.com/d.jsp?llr=iei6rx6ab&p=oi&m=1131440677000&sit=hmwc8c9mb&f=c1095ec4-d2a5-4f31-85e6-9f5d16f7d72c"
        target="_blank"
        color="brown white--text darken-2 mx-0"
        >{{ $t("feedbackBtn2") }}</AntHiveBtn
      >
    </div>
    <div col="12" md="2" class="text-center footer__locale-select">
      <v-select
        v-model="selectedLocale"
        class="footer__locale-select"
        :items="locales"
        prepend-icon="public"
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
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
  &__copyright,
  &__subscribe,
  &__issue,
  &__locale-select {
    color: $color-white;
  }
  &__locale-select {
    max-width: 150px;
  }
}
</style>
