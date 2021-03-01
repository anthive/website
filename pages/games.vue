<template>
  <section class="games page-wrap">
    <v-container class="games__container">
      <div class="d-flex justify-space-between">
        <AntHivePageHeader
          :title="$t('games.title1')"
          :tooltip-text="$t('games.title2')"
        />
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <AntHiveIcon
                  class="filter-icon"
                  icon="filter"
                  small
                />
              </div>
            </template>
            <v-card>
              <v-list>
                <v-list-item
                  v-for="sortOption in sortOptions"
                  :key="sortOption.preset"
                  class="sort-option"
                  @click="gamesSortPreset = sortOption.preset">
                  <AntHiveIcon
                    v-if="sortOption.preset === gamesSortPreset "
                    color="#9786bf"
                    class="preset-radio"
                    icon="radio-on"
                    small
                  />
                  <AntHiveIcon
                    v-else
                    color="#9786bf"
                    class="preset-radio"
                    icon="radio-off"
                    small
                  />
                  <span class="sort-label">{{ sortOption.label }}</span>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>
      <GamesTable :sort="gamesSortPreset" />
    </v-container>
  </section>
</template>

<script>
import GamesTable from '@/components/GamesTable'
import AntHivePageHeader from '@/components/AntHivePageHeader'
import AntHiveIcon from '@/components/AntHiveIcon'

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
    AntHivePageHeader,
    AntHiveIcon
  },
  data() {
    return {
      gamesSortPreset: 'best-score',
      sortOptions: [
        {
          preset: 'best-score',
          label: 'Best score'
        },
        {
          preset: 'longest',
          label: 'Longest games'
        },
        {
          preset: '',
          label: 'Recent games'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.games {
  padding: 40px 0;
}

.filter-icon,
.preset-radio {
  height: 25px;
  width: 25px;
}

.preset-radio {
  margin-right: 5px;
}

.sort-option {
  .sort-label {
    color: $violet
  }
}
</style>
