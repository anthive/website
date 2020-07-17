<template>
  <section class="texture-arrows">
      <v-container>
        <v-card
          class="games__card white text-xs-left"
        >
          <v-card-title class="mb-10">
            <h1 class="headline">
              <span class="primary--text font-weight-medium">{{ $t("games.title1") }}</span>
              <span class="primary--text ml-2">{{ $t("games.title2") }}</span>
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

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.games__card {
  border-radius: $border-radius-default !important;
}

@media screen and (max-width: $screen-sm) {
  .headline {
    text-align: center;
  }
}
</style>
