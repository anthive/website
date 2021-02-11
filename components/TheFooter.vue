<template>
  <v-footer
    class="footer"
    app
    tag="footer"
    absolute
  >
    <!-- Copyright -->
    <div col="12" md="3" class="footer__copyright f-montserrat">
      <span>AntHive.IO &copy; {{ new Date().getFullYear() }}</span>
    </div>

    <!-- PP and TOS links -->
    <div col="12" md="3" class="footer__subscribe f-montserrat">
      <span class="mr-2">
        <span class="white--text ml-1 link" @click="handlerClickTerms">
          {{ $t("footer.termsofService") }}
        </span>
        {{ $t("footer.and") }}
        <span class="white--text link" @click="handlerClickPolicy">
          {{ $t("footer.privacyPolicy") }}
        </span>
      </span>
    </div>

    <!-- Report issue -->
    <div col="12" md="3" class="footer__issue f-montserrat">
      <span
        target="_blank"
        rel="noreferrer"
        class="white--text ml-1 link"
        @click="handlerClickReportIssue"
      >
        {{ $t("footer.report") }}
      </span>
    </div>

    <!-- Social networks icons -->
    <div col="12" md="2" class="footer__social">
      <span
        title="Our Twitter page"
        class="link"
        @click="handlerClickSocial('https://twitter.com/anthiveio', 'Twitter')"
      >
        <AntHiveIcon icon="twitter" color="white" class="footer__social--icon" />
      </span>
      <span
        title="Our Instagram accoutn"
        class="link"
        @click="handlerClickSocial('https://www.instagram.com/anthiveio', 'Instagram')"
      >
        <AntHiveIcon icon="instagram" color="white" class="footer__social--icon" />
      </span>
      <span
        title="Our Youtube channel"
        class="link"
        @click="handlerClickSocial('https://www.youtube.com/channel/UCP9SHUqnSdGEiEHbqIudMxw', 'Youtube')"
      >
        <AntHiveIcon icon="youtube" color="white" class="footer__social--icon" />
      </span>
      <span
        title="Our Twitch accoutn"
        class="link"
        @click="handlerClickSocial('https://www.twitch.tv/anthiveio', 'Twitch')"
      >
        <AntHiveIcon icon="twitch" color="white" class="footer__social--icon" />
      </span>
      <span
        title="Our Discord channel"
        class="link"
        @click="handlerClickSocial('https://discord.gg/3Z7KvYv', 'Discrod')"
      >
        <AntHiveIcon icon="discord" color="white" class="footer__social--icon" />
      </span>
    </div>

    <!-- Languagues -->
    <div col="12" md="2" class="footer__locale-select">
      <label for="select">
        <v-select
          v-model="selectedLocale"
          :items="locales"
          :menu-props="{ top: true, offsetY: true }"
          name="select"
          tile
          dense
          dark
          flat
          item-color="accent"
          hide-details
          @input="switchLocale"
        />
      </label>
      <AntHiveIcon icon="earth" color="white" class="footer__locale-select--earth-icon" />
      <AntHiveIcon icon="chevron-up" color="white" class="footer__locale-select--up-icon" />
    </div>

  </v-footer>
</template>

<script>
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'DefaultFooter',
  components: {
    AntHiveIcon
  },
  data: () => ({
    locales: ['En', 'Ru'],
    selectedLocale: ''
  }),
  created() {
    this.selectedLocale = this.$i18n.locale === 'en' ? this.locales[0] : this.locales[1]
  },
  methods: {
    switchLocale(locale) {
      let localeParam
      switch (locale) {
        case 'En':
          localeParam = 'en'
          break
        case 'Ru':
          localeParam = 'ru'
          break
      }
      this.$gtag('event', `locale_to_${locale}`)
      this.$router.push(this.switchLocalePath(localeParam))
    },
    handlerClickTerms() {
      this.$gtag('event', 'to_terms')
      this.$router.push(this.localePath('tos'))
    },
    handlerClickPolicy() {
      this.$gtag('event', 'to_policy')
      this.$router.push(this.localePath('pp'))
    },
    handlerClickReportIssue() {
      this.$gtag('event', 'report_issue')
      window.open('https://github.com/anthive/website/issues', '_blank', 'noreferrer')
    },
    handlerClickSocial(link, socialName) {
      this.$gtag('event', `to_${socialName}`)
      window.open(link, '_blank', 'noreferrer')
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
  padding: 16px;
  display: flex;
  justify-content: space-around;
  background: $violet !important;
  @media screen and (max-width: $screen-md) {
    flex-direction: column;
  }
  &__locale-select {
    position: relative;
    max-width: 70px;
    margin: 1px 0 2px;
  }
  &__locale-select--earth-icon {
    position: absolute;
    left: -25px;
    top: 5px;
  }
  &__locale-select--up-icon {
    position: absolute;
    right: 0;
    top: 6px;
    pointer-events: none;
  }
  &__social {
    display: flex;
    > * {
      display: inherit;
    }
  }
  &__social--icon {
    margin: 0 5px;
    color: $white !important;
  }
  &__copyright,
  &__subscribe,
  &__issue,
  &__social,
  &__locale-select {
    color: $white;
    text-align: center;
    padding: 0 7px;
    @media screen and (max-width: $screen-lg) {
      margin: 3px 0;
    }
  }
  .link {
    cursor: pointer;
  }
}
</style>
