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
        color="#cdcad5"
      >{{ $t('leaderboard.bots') }}</AntHiveButton>
      <AntHiveButton
        :to="localePath('/leaderboard/users')"
        class="button"
        tile
        color="white"
      ><span class="primary--text">{{ $t('leaderboard.users') }}</span></AntHiveButton>
      <div class="overflow-hidden">
        <client-only>
          <v-data-table
            :headers="headers"
            :items="users"
            disable-pagination
            sort-by="rank"
            sort-desc
            hide-default-footer
            class="users-table"
          >
            <template v-slot:[`item.avatar`]="{ item }">
              <v-avatar tile class="avatar">
                <v-img :src="getUserAvatar(item, 240)" />
              </v-avatar>
            </template>
            <template v-slot:[`item.score`]="{ item }">
              {{ getNumberTruncated(item.score) }}
            </template>
          </v-data-table>
        </client-only>
        <infinite-scroll v-if="users && users.length >= pageSize" :enough="enoughLoadLeaders" @load-more="fetchUsers" />
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
import AntHivePageHeader from '@/components/AntHivePageHeader'
import Image from '@/mixins/image'
import Truncate from '@/mixins/truncate'

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
      users: null,
      enoughLoadLeaders: false,
      pageSize: 20,
      searchParams: {},
      headers: [
        { text: '', value: 'avatar' },
        { text: this.$t('leaderboard.name'), value: 'username' },
        { text: this.$t('leaderboard.games'), value: 'games' },
        { text: this.$t('leaderboard.score'), value: 'score' },
        { text: this.$t('leaderboard.rank'), value: 'rank' }
      ]
    }
  },
  fetch() {
    if (process.server) {
      this.users = []
      this.fetchUsers()
    }
  },
  mounted() {
    this.searchParams = { p: 0, pp: this.pageSize }
    this.users = []
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
.leaderboard .users-table {
  @media screen and (min-width: $screen-sm) {
    margin-left: -16px;
  }
  .text-start.sortable {
    font-weight: $font-weight-bold;
    font-size: $font-small;
    & > span {
      word-break: normal!important;
    }
  }
  .text-start.active {
    text-shadow: 0px 0px 1px $violet, 0px 0px 1px $violet;
    color: $violet!important;
    &.asc>span {
      position: relative;
      &::after {
        position: absolute;
        right: -15px;
        content: '⬇'
      }
    }
    &.desc>span {
      position: relative;
      &::after {
        position: absolute;
        right: -15px;
        content: '⬆'
      }
    }
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
  }
  .skeleton {
    background-color: $white;
    padding-top: 20px;
  }
  @media screen and (min-width: $screen-sm) {
    .avatar {
      width: 120px!important;
      height: 120px!important;
    }
  }
}
</style>
