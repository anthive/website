<template>
  <section class="games page-wrap">
      <v-container class="games__container">
        <v-card
          tile
          class="games__card white text-xs-left"
        >
          <v-card-title>
            <h1 class="headline">
              <span class="primary--text font-weight-medium">{{ $t("games.title1") }}</span>
              <span class="primary--text ml-2">{{ $t("games.title2") }}</span>
            </h1>
          </v-card-title>
          <v-card-text>
            <GamesTable /> 
          </v-card-text>
        </v-card>
     </v-container>
  </section>
</template>

<script>
import GamesTable from '@/components/GamesTable'

export default {
  name: 'defaultHeader',
  head() {
    return {
      title: this.$t('games.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('games.meta.description')
        }
      ]
    }
  },
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

.games {
  padding: 40px 0;
  &__container {
    padding: 0;
  }
}

@media screen and (max-width: $screen-sm) {
  .headline {
    text-align: center;
  }
}
</style>
