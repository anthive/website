<template>
  <section class="games page-wrap">
    <v-container class="games__container">
      <AntHivePageHeader
        :title="$t('games.title1')"
        :tooltip-text="$t('games.title2')"
      />
      <GamesTable />
    </v-container>
  </section>
</template>

<script>
import GamesTable from '@/components/GamesTable'
import AntHivePageHeader from '@/components/AntHivePageHeader'

export default {
  name: 'DefaultHeader',
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
  components: {
    GamesTable,
    AntHivePageHeader
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.games {
  padding: 40px 0;
}
</style>
