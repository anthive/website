<template>
  <section>
    <v-parallax src="/img/bg.jpg" height="350"></v-parallax>
    <v-row align="center" justify="center">
      <v-col cols="11" md="10">
        <v-card
          class="games__card white text-xs-left pa-3 elevation-6"
          flat
          tile
        >
          <v-card-title class="mb-10">
            <h1 class="headline">
              <span class="primary--text">{{ $t("gamesTitle1") }}</span
              ><span class="accent--text ml-2">{{ $t("gamesTitle2") }}</span>
            </h1>
          </v-card-title>
          <v-card-text>
            <GamesTable
              :Filters="filters"
              :PageSize="17"
              :ShowTitle="false"
            ></GamesTable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import GamesTable from '@/components/gamesTable'

export default {
  name: 'defaultHeader',
  data: () => ({
    filters: [],
    user: {}
  }),
  created() {
    this.filters = [{ term: { Age: 1000 } }, { range: { Wealth: { gte: 1000, lte: 3000 } } }]
  },
  components: {
    GamesTable
  }
}
</script>

<style>
.games__card {
  margin-top: -178px;
}
</style>
