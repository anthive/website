<template>
  <section>
    <v-parallax src="/img/bg.jpg" height="350" />
      <v-container>
        <v-card
          class="games__card white text-xs-left elevation-6"
          flat
          tile
        >
          <v-card-title class="mb-10">
            <h1 class="headline">
              <span class="primary--text  font-weight-medium">{{ $t("gamesPage.title1") }}</span
              ><span class="primary--text ml-2">{{ $t("gamesPage.title2") }}</span>
            </h1>
          </v-card-title>
          <v-card-text>
            <GamesTable
              :PageSize="17"
              :ShowTitle="false"
            /> 
          </v-card-text>
        </v-card>
     </v-container>
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
