<template>
  <section>
    <v-parallax src="/img/bg.jpg" height="400"></v-parallax>
    <v-row class="justify-center">
      <v-card class="leaderboard__card">
        <v-list class="py-0">
          <div :key="index" v-for="(player, index) in players">
            <p>{{ player.text }}</p>
            <v-list-item
              :class="(index < 3) && 'orange lighten-5'"
              :to="{ path: '/user/?username=' + player.Username }"
              ><span
                class="ml-2"
                :class=" (index < 3) && 'title orange--text'"
                >{{ index + 1 }}</span
              >
              <v-list-item-avatar class="ml-5" size="70">
                <v-img class="grey lighten-4" :src="player.photoUrl()"></v-img>
                <div class="d-flex flex-column ml-n4">
                  <v-avatar size="30">
                    <v-img :src="player.langUrl()"></v-img>
                  </v-avatar>
                  <v-avatar class="grey lighten-4" size="30">
                    <v-card-text class="pa-0 caption"
                      >v.{{ player.Version }}</v-card-text
                    >
                  </v-avatar>
                </div>
              </v-list-item-avatar>
              <v-list-item-content class="pl-5">
                <v-list-item-title :class="(index < 3) && 'title'">{{
                  player.Username
                }}</v-list-item-title>
                <v-list-item-subtitle
                  >{{ player.Games }}
                  {{ $t("leadGames") }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action class="pr-3">
                <v-list-item-subtitle
                  >{{ player.scoreString() }}
                  {{ $t("leadWealth") }}</v-list-item-subtitle
                >
              </v-list-item-action>
              <v-list-item-action class="pr-3"
                ><span :class="(index < 3) && 'title'"
                  >{{ player.Wg }}
                  <v-icon class="orange--text text--lighten-2 ml-1"
                    >bubble_chart</v-icon
                  ></span
                ></v-list-item-action
              >
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list>
      </v-card>
    </v-row>
  </section>
</template>

<script>
import { search } from '@/services/Bot'

export default {
  name: 'Leaderboard',
  data: () => ({
    players: []
  }),
  created() {
    this.getLeaders()
  },
  methods: {
    async getLeaders() {
      const sort = [{ Wg: { order: 'desc' } }]
      search(sort, 1, 100, null).then(leaders => {
        console.log('start search')
        this.players = leaders
      })
    }
  }
}
</script>
<style>
.leaderboard__card {
  margin-top: -350px;
}
</style>
