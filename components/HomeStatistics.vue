<template>
  <section class="statistics">
    <div
      :class="$vuetify.breakpoint.xsOnly ? 'justify-space-evenly' : 'justify-space-around'"
      class="statistics__row d-flex align-center"
    >
      <v-col md="4" class="statistics__counter">
        <div class="statistics__counter-name">{{ $t("home.ants") }}</div>
        <div class="statistics__counter-number">
          <ICountUp :delay="delay" :end-val="endVal.Ants" :options="options" />
        </div>
      </v-col>

      <v-col md="4" class="statistics__counter">
        <div class="statistics__counter-name">{{ $t("home.games") }}</div>
        <div class="statistics__counter-number">
          <ICountUp :delay="delay" :end-val="endVal.Games" :options="options" />
        </div>
      </v-col>

      <v-col md="4" class="statistics__counter">
        <div class="statistics__counter-name">{{ $t("home.bots") }}</div>
        <div class="statistics__counter-number">
          <ICountUp :delay="delay" :end-val="endVal.Bots" :options="options" />
        </div>
      </v-col>
    </div>
    <div class="statistics__actions">
      <AntHiveButton
        :to="localePath('sandbox')"
        large
        tile
        class="mr-4"
        color="action">
        {{ $t("header.sandbox") }}
      </AntHiveButton>
      <AntHiveButton
        large
        tile
        color="primary"
        @click="handlerClickGetStarted">
        {{ $t("header.buttonJoin") }}
      </AntHiveButton>
    </div>
    <div class="bg-ornament" />
  </section>
</template>

<script>
import ICountUp from 'vue-countup-v2'
export default {
  components: {
    ICountUp
  },
  data() {
    return {
      profileUrl: process.env.PROFILE_URL,
      delay: 1000,
      endVal: {
        Games: 32156,
        Bots: 42,
        Ants: 704269
      },
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },
  methods: {
    handlerClickGetStarted() {
      this.$gtag('event', 'Get started Homepage', { event_category: 'getstarted', event_label: 'homepage' })
      window.location.href = this.profileUrl
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.justify-space-evenly {
  justify-content: space-evenly !important;
}
.statistics {
  padding: 140px 0 80px;
  position: relative;
  overflow: hidden;
  background-color: $lilac-select;

  &__row {
    max-width: 600px;
    margin: 0 auto;
  }

  &__counter {
    z-index: 1;
    text-align: center;
    color: $color-white;
    font-size: 22px;
    margin-bottom: 100px;
    font-weight: 500;
  }

  &__counter-name,
  &__counter-number {
    color: $violet;
  }

  &__actions {
    text-align: center;
  }

  .bg-ornament {
    position: absolute;
    width: 535px;
    right: -221px;
    height: 640px;
    top: -50px;
    background: url(/img/bg-ornament.svg);
    transform: rotate(270deg);
  }
}

@media only screen and (max-width: $screen-sm) {
  .statistics {
    &__row {
      flex-direction: column;
      flex: unset !important;
    }
  }
}

@media screen and (max-width: $screen-sm) {
  .statistics {
    padding-top: 60px;
    padding-bottom: 120px;
  }
}
</style>
