<template>

 <!-- <section class="leaderboard texture-arrows">
  <v-card class="leaderboard__table">
      <v-row class="leaderboard__table-head">
        <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="6" sm="1" class="leader-card__places">
          <span>{{ $t('leaderboard.place') }}</span>
        </v-col>
        <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="6" sm="6" class="pl-7">
          <span>{{ $t('leaderboard.player') }}</span>
        </v-col>
        <v-col cols="6" sm="1"
          class="leaderboard__table-score"
        >
          {{ $t(`leaderboard.byGames`) }}
        </v-col>
          <v-col cols="6" sm="2"
          class="leaderboard__table-score"
        >
          {{ $t(`leaderboard.byScore`) }}
        </v-col>
         <v-col cols="6" sm="2"
          class="leaderboard__table-score"
        >
          {{ $t(`leaderboard.byVersion`) }}
        </v-col>
      </v-row>
      <GamesLeaderCard
        class="leaderboard__table-player"
        :key="player.displayName + index"
        v-for="(player, index) in players"
        :place="index + 1"
        :leader="player"
      />
    </v-card> -->
  <section class="leaderboard page-wrap">
    <v-container>
      <div class="leaderboard__header header">
        <div class="header__img-wrap">
          <!-- <v-img src="/img/leaderboard-title-icon.svg" /> -->
          <!-- TODO: dynamic -->
          <div class="header__lang">C++</div>
        </div>
        <ThePageHeader
          :title="$t('leaderboard.title')"
          subtitle="World"
          :tooltip-text="$t('leaderboard.description')"
        />
      </div>

      <!-- <v-card tile class="leaderboard__filter filter">
        <v-row>
          <v-col cols="12" sm="4" class="filter__langs">
            <div class="filter__title">{{ $t('leaderboard.languages') }}:</div>
            <div class="filter__langs-icons">
              <img
                :key="lang.id"
                v-for="lang in getLangs"
                class="filter__lang-icon"
                width="40px"
                :src="lang.img"
                :alt="lang.id" 
              />
            </div>
          </v-col>
          <v-col cols="12" sm="5" class="filter__countries">
            <div class="filter__title">{{ $t('leaderboard.countries') }}:</div>
            <v-select
              :menu-props="{ offsetY: true }"
              class="anthive-select"
              :items="countries"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="3" class="filter__cities">
            <div class="filter__title">{{ $t('leaderboard.city') }}:</div>
            <v-select
              :menu-props="{ offsetY: true }"
              item-color="red"
              class="anthive-select"
              :items="cities"
            ></v-select>
          </v-col>
        </v-row>
      </v-card> -->

      <div class="leaderboard__table">
        <v-row class="leaderboard__table-head">
          <v-col cols="6" sm="4"
            class="leaderboard__table-score"
            v-for="(column, index) in columns"
            :key="index"
          >
            <div class="leaderboard__table-score-title">{{ $t(`leaderboard.${column.text}`) }}
              <div class="header__info">
                <v-tooltip right nudge-left color="accent" content-class="b-radius-0">
                  <template v-slot:activator="{ on }">
                    <div v-on="on">
                      <AntHiveIcon class="ml-1" small color="#4c377f">alert-circle</AntHiveIcon>
                    </div>
                  </template>
                  {{ $t(`leaderboard.${column.description}`) }}
                </v-tooltip>
              </div>
            </div>
          </v-col>
        </v-row>
        <GamesLeaderCard
          class="leaderboard__table-player"
          :key="player.displayName + index"
          v-for="(player, index) in players"
          :place="index + 1"
          :leader="player"
        />
      </div>
    </v-container>
  </section>
</template>

<script>
import { getBotsLeaderboard } from '@/services/Bot'
import GamesLeaderCard from '@/components/GamesLeaderCard'
import GamesUserCard from '@/components/GamesUserCard'
import AntHiveIcon from '@/components/AntHiveIcon'
import ThePageHeader from '@/components/ThePageHeader'
import langs from '../static/langs/data.json'

export default {
  head() {
    return {
      title: this.$t('leaderboard.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('leaderboard.meta.description')
        }
      ]
    }
  },
  components: {
    GamesLeaderCard,
    GamesUserCard,
    AntHiveIcon,
    ThePageHeader
  },
  name: 'Leaderboard',
  data: () => ({
    countries: ['russia', 'usa'], // TODO
    cities: ['moscow', 'new yourk'], // TODO
    langs: [],
    players: [],
    columns: [
      {
        text: 'mmr',
        sortable: true,
        description: 'mmr' // TODO: add description
      }
    ]
  }),
  async fetch() {
    if (process.server) {
      this.players = await getBotsLeaderboard()
    }
  },
  async mounted() {
    this.players = await getBotsLeaderboard()
  },
  computed: {
    getLangs() {
      return langs
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/style/global.scss';
.anthive-select {
  .v-input__slot {
    padding: 0 10px;
    background: linear-gradient(0deg, rgba(154, 100, 255, 1) 50%, rgba(154, 100, 255, 0.8) 50%);
  }
  .v-select__selection--comma {
    color: $color-white !important;
  }
  .v-input__icon .v-icon.v-icon {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 12px solid $color-white;
  }
}
</style>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.leaderboard {
  padding: 40px 0;
  .header {
    display: flex;
    &__img-wrap {
      position: relative;
      max-width: 50px;
      margin: 8px 20px 0 0;
    }
    &__lang {
      position: absolute;
      color: $color-white;
      top: 16px;
      font-size: 11px;
      font-weight: 600;
      width: 50%;
      text-align: center;
    }
    &__title-wrap {
      position: relative;
    }
    &__subtitle {
      color: $color-violet-600;
      font-weight: 400;
    }
    &__info {
      position: absolute;
      top: -5px;
      right: -26px;
    }
  }
  .filter {
    margin-top: 40px;
    padding: 20px;
    display: flex;

    & > div {
      padding: 0 20px;
    }

    &__countries {
      border-left: 2px solid $color-violet-600;
      border-right: 2px solid $color-violet-600;
    }

    &__title {
      color: $color-violet-700;
      font-weight: 500;
      margin-bottom: 10px;
    }

    &__lang-icon {
      margin-right: 10px;
    }
  }

  &__card {
    padding: 0 10px 10px;
  }
  &__table {
    margin: 0 auto;
  }
  &__table-head {
    justify-content: flex-end;
    padding: 0 12px;
    margin: 0;
    text-transform: uppercase;
    font-weight: 500;
  }
  &__table-score {
    text-align: center;
    cursor: pointer;
    &:first-child {
      text-align: left;
      padding-left: 40px;
    }
  }
  &__table-score-title {
    display: inline;
    position: relative;
  }
  &__table-player {
    margin: 0;
  }
  &__user-card {
    margin-bottom: 15px;
  }
  &__sort-item {
    margin-left: 10px;
    cursor: pointer;
  }
  &__top-players {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}

@media screen and (max-width: $screen-lg) {
  .leaderboard {
    &__top-players {
      width: auto;
      flex-direction: column;
    }
    .headline {
      width: 100%;
      text-align: center;
    }
    &__user-card {
      margin: 0 auto 15px;
    }
  }
}
@media screen and (max-width: $screen-md) {
  .leaderboard {
    &__table-score {
      text-align: center;
    }
  }
}
</style>
