<template>
  <section class="games page-wrap">
      <v-container class="games__container">
        <ThePageHeader
          :title="$t('games.title1')"
          :tooltip-text="$t('games.title2')"
        />
        <GamesTable />
     </v-container>
  </section>
</template>

<script>
import GamesTable from '@/components/GamesTable'
import AntHiveIcon from '@/components/AntHiveIcon'
import ThePageHeader from '@/components/ThePageHeader'

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
    AntHiveIcon,
    ThePageHeader
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
