<template>
  <section class="counters texture-scrabble">
    <div
      class="counters__row d-flex align-center"
      :class="
        $vuetify.breakpoint.xsOnly
          ? 'justify-space-evenly'
          : 'justify-space-around'
      "
    >
      <v-col md="4" class="counters__counter">
        <div class="counters__counter-name">Bots</div>
        <div class="counters__counter-number">
          <ICountUp :delay="delay" :endVal="endVal.Bots" :options="options" />
        </div>
      </v-col>

      <v-col md="4" class="counters__counter">
        <div class="counters__counter-name">Games</div>
        <div class="counters__counter-number">
          <ICountUp :delay="delay" :endVal="endVal.Games" :options="options" />
        </div>
      </v-col>

      <v-col md="4" class="counters__counter">
        <div class="counters__counter-name">Ants</div>
        <div class="counters__counter-number">
          <ICountUp :delay="delay" :endVal="endVal.Ants" :options="options" />
        </div>
      </v-col>
    </div>
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.justify-space-evenly {
  justify-content: space-evenly !important;
}
.counters {
  margin-top: -75px;
  padding: 40px 0;
  clip-path: polygon(0% 0%, 100% 3.49vw, 100% 100%, 0% 100%);
  &__row {
    height: 300px;
  }
  &__counter {
    text-align: center;
    color: $color-white;
    font-size: 42px;
  }
  &__counter-name {
    font-weight: 500;
  }
  &__counter-number {
    font-weight: 400;
  }
}

@media only screen and (max-width: $screen-sm) {
  .counters {
    &__row {
      flex-direction: column;
      height: 450px;
      flex: unset !important;
    }
  }
}

@media screen and (max-width: $screen-sm) {
  .counters {
    padding-top: 10px;
    padding-bottom: 50px;
  }
}
</style>
