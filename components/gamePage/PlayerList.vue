<template>
  <div class="players__wrap">
    <div class="d-flex flex-column players__list">
      <v-card class="d-flex align-center" @click="togglePlayerList()" tile color="accent"
        ><AntHiveIcon
          class="py-3 px-1 text-center mdi"
          color="white"
          big
        >{{ showPlayerList ? 'chevron-left' : 'chevron-right' }}</AnthiveIcon
      > <v-card-text v-if="showPlayerList" class="pa-3 white--text">{{ $t('game.sidebarTitle') }}</v-card-text></v-card>
      <div :key="index" v-for="(player, index) in players">
        <v-card
          v-if="showPlayerList"
          @click="showUserCard(player)"
          tile
          class="pa-2 elevation-0"
        >
          <UserChip :player="player" :number="index + 1" />
        </v-card>
        <v-card v-else @click="showUserCard(player)" tile class="pa-2 elevation-0">
          <UserIcon :player="player" :number="index + 1" />
        </v-card>
      </div>
    </div>
     <v-dialog v-model="isShowUserCard" width="380">
       <UserCard :player="selectedPlayer" />
    </v-dialog>
  </div>
</template>


<script>
import UserChip from '@/components/UserInfo/UserChip'
import UserIcon from '@/components/UserInfo/UserIcon'
import UserCard from '@/components/UserInfo/UserCard'
import AntHiveIcon from '@/components/global/AntHiveIcon'

export default {
  name: 'PlayersList',
  components: {
    UserChip,
    UserIcon,
    UserCard,
    AntHiveIcon
  },
  data: () => ({
    showPlayerList: false,
    isShowUserCard: false,
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
    },
    togglePlayerList() {
      this.showPlayerList = !this.showPlayerList
      this.$emit('togglePlayerList')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';
.players__wrap {
  position: absolute;
  z-index: 10000;
  height: 100%;
}
.players__list {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  background-color: $color-white;
  &--toggled {
    min-width: 250px;
  }
}
.players__list-toggle {
  position: absolute;
  width: 40px;
  height: 60px;
  right: -20px;
  z-index: 1;
  background: #341d3d96;
  border-radius: 0px 8px 8px 0px;
  cursor: pointer;
}
.players__list-toggle-icon {
  font-size: 40px;
  margin: 10px;
  margin-left: 0px;
  background-color: $color-white;
}
.players__list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: $color-white;
}
.players__list::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}
.players__list::-webkit-scrollbar-thumb {
  background-color: #362d59;
  border: none;
}
</style>
