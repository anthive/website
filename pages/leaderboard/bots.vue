<template>
  <section class="leaderboard page-wrap">
    <v-container>
      <div class="header">
        <AntHivePageHeader
          :title="$t('leaderboard.title')"
          :tooltip-text="$t('leaderboard.description')"
        />
      </div>
      <AntHiveButton
        :to="localePath('/leaderboard/bots')"
        class="button"
        tile
        color="white"
      ><span class="primary--text">{{ $t('leaderboard.bots') }}</span></AntHiveButton>
      <AntHiveButton
        :to="localePath('/leaderboard/users')"
        class="button"
        tile
        color="#cdcad5"
      >{{ $t('leaderboard.users') }}</AntHiveButton>
      <div class="overflow-hidden">
        <client-only>
          <v-data-table
            :headers="headers"
            :items="bots"
            disable-pagination
            sort-by="mmr"
            sort-desc
            hide-default-footer
            class="table"
          >
            <template v-slot:[`item.avatar`]="{ item }">
              <v-avatar
                tile
                width="120px"
                height="120px">
                <v-img :src="getAvatar(item.avatar, 240)" />
              </v-avatar>
            </template>
            <template v-slot:[`item.err`]="{ item }">
              {{ item.err }}%
            </template>
            <template v-slot:[`item.score`]="{ item }">
              {{ getNumberTruncated(item.score) }}
            </template>
            <template v-slot:[`item.art`]="{ item }">
              {{ getNumberTruncated(item.art) }} ms
            </template>
            <template v-slot:[`item.lang`]="{ item }">
              <v-avatar tile size="40">
                <v-img :src="getLangImg(item.lang)" />
              </v-avatar>
            </template>
            <template v-slot:[`item.author`]="{ item }">
              <nuxt-link
                :to="localePath(`/users?username=${item.username}`)"
                class="information-user"
                @click.native="$gtag('event', 'leaderboard_to_author')">
                <v-avatar class="ml-1" tile size="30">
                  <v-img :src="getAvatar(item.userAvatar, 60)" />
                </v-avatar>
                {{ item.username }}
              </nuxt-link>
            </template>
          </v-data-table>
        </client-only>
        <infinite-scroll :enough="enoughLoadLeaders" @load-more="fetchBots" />
        <template v-if="!bots.length">
          <v-skeleton-loader
            v-for="skeleton in 8"
            :key="skeleton + 'skeleton'"
            tile
            width="100%"
            height="120px"
            class="skeleton"
            elevation="2"
            type="list-item-avatar-three-line"
          />
        </template>
      </div>
    </v-container>
  </section>
</template>

<script>
import langs from '@/static/langs/data.json'
import { getBotsLeaderboard } from '@/services/Bot'
import AntHiveIcon from '@/components/AntHiveIcon'
import Image from '@/mixins/image'
import Truncate from '@/mixins/truncate'
import AntHivePageHeader from '@/components/AntHivePageHeader'

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
  name: 'Leaderboard',
  components: {
    AntHiveIcon,
    AntHivePageHeader
  },
  mixins: [Image, Truncate],
  data() {
    return {
      langs: [],
      bots: [],
      headers: [
        { text: '', value: 'avatar' },
        { text: this.$t('leaderboard.language'), value: 'lang' },
        { text: this.$t('leaderboard.name'), value: 'displayName' },
        { text: this.$t('leaderboard.version'), value: 'v' },
        { text: this.$t('leaderboard.mmr'), value: 'mmr' },
        { text: this.$t('leaderboard.wins'), value: 'wins' },
        { text: this.$t('leaderboard.losses'), value: 'losses' },
        { text: this.$t('leaderboard.score'), value: 'score' },
        { text: this.$t('leaderboard.art'), value: 'art' },
        { text: this.$t('leaderboard.errors'), value: 'err' },
        { text: this.$t('leaderboard.author'), value: 'author' }
      ],
      columns: [
        {
          text: 'mmr',
          sortable: true,
          description: 'mmr' // TODO: add description
        }
      ],
      enoughLoadLeaders: false,
      pageSize: 20,
      searchParams: {}
    }
  },
  computed: {
    getLangs() {
      return langs
    }
  },
  fetch() {
    if (process.server) {
      this.fetchBots()
    }
  },
  mounted() {
    this.searchParams = { p: 0, pp: this.pageSize }
    this.fetchBots()
    this.$gtag('event', 'leaderboard_bots')
  },
  methods: {
    async fetchBots() {
      this.enoughLoadLeaders = true
      const bots = await getBotsLeaderboard(this.searchParams)
      if (bots.length) {
        this.searchParams.p += 1
        this.bots = this.bots.concat(bots)
        this.enoughLoadLeaders = false
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/style/global.scss';
.table {
  margin-left: -16px!important;
}
.anthive-select {
  .v-input__slot {
    padding: 0 10px;
    background: linear-gradient(0deg, rgba(154, 100, 255, 1) 50%, rgba(154, 100, 255, 0.8) 50%);
  }
  .v-select__selection--comma {
    color: $white !important;
  }
  .v-input__icon .v-icon.v-icon {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 12px solid $white;
  }
}
</style>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.leaderboard {
  padding: 40px 0;
  .header {
    display: flex;
    margin-bottom: 38px;
    &__img-wrap {
      position: relative;
      max-width: 50px;
      margin: 8px 20px 0 0;
    }
    &__lang {
      position: absolute;
      color: $white;
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
      color: $violet;
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
      border-left: 2px solid $violet;
      border-right: 2px solid $violet;
    }

    &__title {
      color: $violet;
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
  .table {
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
  &__table-bot {
    margin: 0;
  }
  &__sort-item {
    margin-left: 10px;
    cursor: pointer;
  }
  &__top-bots {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .skeleton {
    background-color: $white;
    padding-top: 20px;
  }
}

@media screen and (max-width: $screen-lg) {
  .leaderboard {
    &__top-bots {
      width: auto;
      flex-direction: column;
    }
    .headline {
      width: 100%;
      text-align: center;
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
