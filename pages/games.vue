<template>
  <section class="games page-wrap">
      <v-container class="games__container">
        <div class="games__title-wrap">
          <h1 class="games__title">{{ $t("games.title1") }}</h1>
          <div class="games__info">
            <v-tooltip right nudge-left color="accent" content-class="b-radius-0">
              <template v-slot:activator="{ on }">
                <div v-on="on">
                  <AntHiveIcon class="ml-1" small color="#4c377f">alert-circle</AntHiveIcon>
                </div>
              </template>
              {{ $t("games.title2") }}
            </v-tooltip>
          </div>
        </div>
        <GamesTable />
     </v-container>
  </section>
</template>

<script>
import GamesTable from '@/components/GamesTable'
import AntHiveIcon from '@/components/AntHiveIcon'

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
    GamesTable,
    AntHiveIcon
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.games {
  padding: 40px 0;

  &__title-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 20px;
  }

  &__info {
    position: absolute;
    top: -5px;
    right: -26px;
  }
}

@media screen and (max-width: $screen-sm) {
  .headline {
    text-align: center;
  }
}
</style>
