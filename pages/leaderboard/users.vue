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
        color="primary"
      >{{ $t('leaderboard.bots') }}</AntHiveButton>
      <AntHiveButton
        :to="localePath('/leaderboard/users')"
        disabled
        light
        class="button"
        tile
        color="primary"
      >{{ $t('leaderboard.users') }}</AntHiveButton>
      <div class="table">
        <template>
          <LeaderboardUserChip
            v-for="(user, index) in users"
            :key="user.username"
            :place="index + 1"
            :leader="user"
          />
          <infinite-scroll v-if="users.length >= pageSize" :enough="enoughLoadLeaders" @load-more="fetchUsers" />
        </template>

        <template v-if="!users">
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
import { getUsersLeaderboard } from '@/services/User'
import AntHiveIcon from '@/components/AntHiveIcon'
import LeaderboardUserChip from '@/components/LeaderboardUserChip'
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
    LeaderboardUserChip,
    AntHiveIcon,
    AntHivePageHeader
  },
  data() {
    return {
      countries: ['russia', 'usa'], // TODO
      cities: ['moscow', 'new yourk'], // TODO
      langs: [],
      users: [],
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
  fetch() {
    if (process.server) {
      this.fetchUsers()
    }
  },
  mounted() {
    this.searchParams = { p: 0, pp: this.pageSize }
    this.fetchUsers()
    this.$gtag('event', 'leaderboard_users')
  },
  methods: {
    async fetchUsers() {
      this.enoughLoadLeaders = true
      const users = await getUsersLeaderboard(this.searchParams)
      if (users.length) {
        this.searchParams.p += 1
        this.users = this.users.concat(users)
        this.enoughLoadLeaders = false
      }
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
  &__user-card {
    margin-bottom: 15px;
  }
  &__sort-item {
    margin-left: 10px;
    cursor: pointer;
  }
  .skeleton {
    background-color: $white;
    padding-top: 20px;
  }
}

@media screen and (max-width: $screen-lg) {
  .leaderboard {
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