<template>
  <div class="players__wrap">
    <div class="d-flex flex-column mr-5 players__list elevation-3">
      <v-card class="d-flex align-center" @click="togglePlayerList()" tile color="accent"
        ><v-icon
          class="py-3 px-1 text-center mdi"
          color="white"
          size="40"
          :class="[showPlayerList ? 'mdi-chevron-left' : 'mdi-chevron-right']"
        ></v-icon
      > <v-card-text v-if="showPlayerList" class="pa-3 white--text">Click to see full info</v-card-text></v-card>
      <div :key="index" v-for="(player, index) in players">
        <v-card
          v-if="showPlayerList"
          @click="1 + 1"
          tile
          class="pa-2 elevation-0"
        >
          <UserChip :player="player" :number="index + 1"></UserChip>
        </v-card>
        <v-card v-else @click="1 + 1" tile class="pa-2 elevation-0">
          <UserIcon :player="player" :number="index + 1"></UserIcon>
        </v-card>
      </div>
    </div>
  </div>
</template>


<script>
import UserChip from '@/components/UserInfo/UserChip'
import UserIcon from '@/components/UserInfo/UserIcon'

export default {
  name: 'PlayersList',
  components: {
    UserChip,
    UserIcon
  },
  data: () => ({
    showPlayerList: false
  }),
  props: {
    players: Array
  },
  methods: {
    togglePlayerList() {
      this.showPlayerList = !this.showPlayerList
      this.$emit('togglePlayerList')
    }
  }
}
</script>

<style scoped>
.players__wrap {
  position: relative;
}
.players__list {
  height: 987px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  background-color: #fff;
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
  color: white;
}
.players__list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
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
