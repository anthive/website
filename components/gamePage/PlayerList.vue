<template>
  <div class="players__wrap">
    <div class="players__list-toggle" @click="togglePlayerList()">
      <v-icon
        class="players__list-toggle-icon mdi"
        color="white"
        size="40"
        :class="[showPlayerList ? 'mdi-chevron-left' : 'mdi-chevron-right']"
      ></v-icon>
    </div>
    <div class="d-flex flex-column mr-5 players__list texture-scrabble">
      <div :key="index" v-for="(player, index) in players">
        <div class="d-flex">
          <userChip
            :player="player"
            :number="index + 1"
            :isOpened="showPlayerList"
          ></userChip>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import userChip from '@/components/UserChip'
export default {
  name: 'PlayersList',
  components: {
    userChip
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
  background-color: #1a1a1a;
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
