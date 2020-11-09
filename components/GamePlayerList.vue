<template>
  <div class="players">
    <div class="players__wrap">
      <h4>{{ $t("game.players") }}</h4>
      <div class="players__list">
        <v-card
          :key="index"
          v-for="(player, index) in players"
          tile
          class="pa-2 mx-3 elevation-0"
        >
          <GamesUserChip :player="player" :number="index + 1" />
        </v-card>
      </div>
    </div>
  </div>
</template>


<script>
import GamesUserChip from '@/components/GamesUserChip'
import GamesUserIcon from '@/components/GamesUserIcon'
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'GamePlayersList',
  components: {
    GamesUserChip,
    GamesUserIcon,
    AntHiveIcon
  },
  data: () => ({
    selectedPlayer: {}
  }),
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  methods: {
    showUserCard(player) {
      this.selectedPlayer = player
      this.isShowUserCard = true
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';
.players {
  height: 100%;
  background-color: $color-white;
  box-shadow: $box-shadow-default;

  &__wrap {
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    background-color: $color-white;
    &--toggled {
      min-width: 250px;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
