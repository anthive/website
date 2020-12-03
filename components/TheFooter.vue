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
    <div col="12" md="3" class="footer__issue f-montserrat">
      <a
        href="https://github.com/anthive/website/issues"
        target="_blank"
        rel="noreferrer"
        class="accent--text ml-1"
      >
        {{ $t("footer.report") }}
      </a>
    </div>

    <!-- Social networks icons -->
    <div col="12" md="2" class="footer__social">
      <a
        href="https://twitter.com/anthiveio"
        title="Our Twitter page"
        rel="noreferrer"
        target="_blank"
      >
        <AntHiveIcon color="white" class="footer__social--icon">twitter</AntHiveIcon>
      </a>
      <a
        href="https://www.instagram.com/anthiveio/"
        title="Our Instagram accoutn"
        rel="noreferrer"
        target="_blank"
      >
        <AntHiveIcon color="white" class="footer__social--icon">instagram</AntHiveIcon>
      </a>
      <a
        href="https://www.youtube.com/channel/UCP9SHUqnSdGEiEHbqIudMxw"
        title="Our Youtube channel"
        rel="noreferrer"
        target="_blank"
      >
        <AntHiveIcon color="white" class="footer__social--icon">youtube</AntHiveIcon>
      </a>
      <a
        href="https://www.twitch.tv/anthiveio"
        title="Our Twitch accoutn"
        rel="noreferrer"
        target="_blank"
      >
        <AntHiveIcon color="white" class="footer__social--icon">twitch</AntHiveIcon>
      </a>
      <a
        href="https://discord.gg/3Z7KvYv"
        title="Our Discord channel"
        rel="noreferrer"
        target="_blank"
      >
        <AntHiveIcon color="white" class="footer__social--icon">discord</AntHiveIcon>
      </a>
    </div>

    <!-- Languagues -->
    <div col="12" md="2" class="footer__locale-select">
      <v-select
        v-model="selectedLocale"
        :items="locales"
        tile
        dense
        dark
        flat
        item-color="accent"
        hide-details
        :menu-props="{ top: true, offsetY: true }"
        @input="switchLocale"
      />
      <AntHiveIcon color="white" class="footer__locale-select--earth-icon">earth</AntHiveIcon>
      <AntHiveIcon color="white" class="footer__locale-select--up-icon">chevron-up</AntHiveIcon>
    </div>

  </v-footer>
</template>

<script>
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'defaultFooter',
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
  padding: 16px;
  display: flex;
  justify-content: space-around;
  background: $color-violet-700 !important;
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
