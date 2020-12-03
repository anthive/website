<template>
  <div class="px-3">
    <v-row class="leader-card">
      <!-- TOP 3 -->
      <v-col cols="2" sm="1" class="leader-card__places">
        <img
          v-if="place === 1"
          class="filter__lang-icon ml-n3"
          width="73px"
          src="/img/leaderboard-top1.svg"
          alt="Leaderboard TOP1"
        />
        <img
          v-else-if="place === 2"
          class="filter__lang-icon"
          width="50px"
          src="/img/leaderboard-top2.svg"
          alt="Leaderboard TOP2"
        />
        <img
          v-else-if="place === 3"
          class="filter__lang-icon"
          width="50px"
          src="/img/leaderboard-top3.svg"
          alt="Leaderboard TOP3"
        />
        <span v-else class="leader-card__place-text">{{ place }}</span>
      </v-col>

      <v-col cols="12" sm="11">
        <v-card tile>
          <v-row>
            <v-col cols="12" sm="7">
              <div>
                <div class="leader-card__avatar-name">
                  <v-avatar tile size="65" class="leader-card__avatar">
                    <v-img :src="getAvatar(leader.avatar)" />
                  </v-avatar>
                  <span class="leader-card__name">
                    {{ leader.displayName }}
                    <span class="leader-card__version">v.{{ leader.v }}</span>
                    <v-avatar tile size="20" class="ml-2">
                      <v-img :src="getLangImg(leader.lang)" />
                    </v-avatar>
                  </span>
                </div>
              </div>
            </v-col>
            <v-col cols="3" sm="3" class="leader-card__score">
              <div>{{ leader.mmr }}</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AntHiveIcon from '@/components/AntHiveIcon'
import langs from '../static/langs/data.json'

export default {
  name: 'GamesLeaderCard',
  components: {
    AntHiveIcon
  },
  props: {
    leader: { type: Object, required: true },
    place: { type: Number, required: true }
  },
  methods: {
    getAvatar(id) {
      return `${process.env.API_URL}/images/${id}/100/100`
    },
    getLangImg(lang) {
      const currentLang = langs.find(l => l.id === lang)
      return currentLang.img
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';

.leader-card {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: -1px;

  &__place-icon {
    width: 36px;
  }

  &__place-text {
    font-size: 22px;
    font-weight: 500;
    color: $color-violet-650;
    border: 2px solid $color-violet-650;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: block;
    text-align: center;
    padding-top: 2px;
  }

  &__avatar-name {
    display: flex;
    padding-left: 20px;
  }

  &__name {
    font-weight: 500;
    margin-left: 20px;
    line-height: 60px;
  }

  &__version {
    color: $color-violet-600;
    font-weight: 400;
    font-size: $font-small;
  }

  &__score {
    text-align: center;
    line-height: 64px;
  }
}
@media screen and (max-width: $screen-md) {
  .leader-card {
    &__score {
      text-align: center;
    }
    &__avatar-name {
      padding-left: 0;
    }
    &__name {
      line-height: normal;
      padding-top: 12px;
    }
  }
}
</style>
