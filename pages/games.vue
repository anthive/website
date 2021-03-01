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
              <div
                class="sort"
                v-on="on">
                <span class="mr-2">
                  {{ $t(`games.${gamesSortType.label}`) }}
                </span>
                <AntHiveIcon
                  color="#4d3780"
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
                  :key="sortOption.type"
                  class="sort-option"
                  @click="gamesSortType = sortOption">
                  <AntHiveIcon
                    v-if="sortOption.type === gamesSortType.type"
                    color="#9786bf"
                    class="type-radio"
                    icon="radio-on"
                    small
                  />
                  <AntHiveIcon
                    v-else
                    color="#9786bf"
                    class="type-radio"
                    icon="radio-off"
                    small
                  />
                  <span class="sort-label">
                    {{ $t(`games.${sortOption.label}`) }}
                  </span>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>
      <GamesTable :sort-type="gamesSortType.type" />
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
      gamesSortType: {},
      sortOptions: [
        {
          type: 'best-score',
          label: 'bestScore'
        },
        {
          type: 'longest',
          label: 'longest'
        },
        {
          type: '',
          label: 'recent'
        }
      ]
    }
  },
  mounted() {
    this.gamesSortType = this.sortOptions[0]
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.games {
  padding: 40px 0;
}

.filter-icon,
.type-radio {
  height: 25px;
  width: 25px;
}

.filter-icon {
  cursor: pointer;
}

.type-radio {
  margin-right: 5px;
}

.sort {
  display: flex;
  align-items: center;
  color: $violet;
  font-weight: $font-weight-bold;
}

.sort-option {
  .sort-label {
    color: $violet
  }
}
</style>
