<template>
  <div class="players">
    <div class="players__wrap">
      <div class="players__list">
        <transition-group name="flip-list">
          <v-card
            :key="player.id"
            v-for="(player, index) in players"
            tile
            width="100%"
            class="py-2 elevation-0"
          >
            <GamesUserChip :player="player" :number="index + 1" />
          </v-card>
        </transition-group>
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

  &__wrap {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
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
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .flip-list-enter-active,
  .flip-list-leave-active {
    transition: all 0.8s;
  }
  .flip-list-enter,
  .flip-list-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
}
</style>
