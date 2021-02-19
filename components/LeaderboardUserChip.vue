<template>
  <v-row class="leader-card">
    <v-col
      cols="12"
      sm="1"
      class="text-center">
      <!-- TOP 3 -->
      <span v-if="place === 1" class="place">{{ place }}</span>
      <span v-else-if="place === 2" class="place">{{ place }}</span>
      <span v-else-if="place === 3" class="place">{{ place }}</span>

      <span v-else class="place">{{ place }}</span>
    </v-col>

    <v-col cols="12" sm="11" class="py-0">
      <v-card
        :to="localePath(`/users?username=${leader.username}`)"
        class="card"
        tile
        @click.native="$gtag('event', 'leaderboard_to_user')">
        <div class="d-flex">
          <div class="avatar">
            <v-avatar
              tile
              width="120px"
              height="120px"
              class="avatar">
              <v-img :src="getAvatar(leader.avatar, 240)" />
            </v-avatar>
          </div>
          <div class="information">
            <div>
              {{ leader.username }}
            </div>
            <div class="statistic">
              <div>
                <AntHiveIcon
                  icon="star"
                  class="mx-1"
                  small
                  color="#d1cae8"
                />
                {{ leader.games }}
              </div>
              <div>
                <AntHiveIcon
                  icon="challange"
                  class="mx-1"
                  small
                  color="#d1cae8"
                />
                {{ leader.rank }}
              </div>
              <div class="score">
                <AntHiveIcon
                  icon="trophy-award"
                  class="mx-1"
                  small
                  color="#d1cae8"
                />
                {{ getNumberTruncated(leader.score) }}
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Truncate from '@/mixins/truncate'

import Image from '@/mixins/image'
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'LeaderboardBotChip',
  components: {
    AntHiveIcon
  },
  mixins: [Image, Truncate],
  props: {
    leader: { type: Object, required: true },
    place: { type: Number, required: true }
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

  .card {
    text-decoration: none !important;
  }

  .place {
    font-size: $font-bigger;
    font-weight: $font-weight-bold;
    color: $violet;
  }

  .avatar {
    position: relative;
  }

  .information {
    width: 100%;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $violet;
    font-size: $font-medium;
    font-weight: $font-weight-bold;
  }

  .statistic {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    & > div {
      margin-left: 90px;
    }

    .score {
      min-width: 75px;
    }
  }
}
@media screen and (max-width: $screen-md) {
  .leader-card {
    .score {
      text-align: center;
    }
    .avatar-name {
      padding-left: 0;
    }
    .name {
      line-height: normal;
      padding-top: 12px;
    }
  }
}
</style>
