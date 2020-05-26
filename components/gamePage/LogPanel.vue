<template>
  <div class="log-panel__wrap mt-3">
    <div class="log-panel__tabs texture-scrabble py-2" dark hide-slider>
      <AntHiveBtn
        :class="{ 'v-btn--active': currentLogTab == 'request' }"
        @click="currentLogTab = 'request'"
        class="mx-2"
        fill
        >Requests</AntHiveBtn
      >
      <AntHiveBtn
        :class="{ 'v-btn--active': currentLogTab == 'response' }"
        @click="currentLogTab = 'response'"
        class="mx-2"
        fill
        >Response</AntHiveBtn
      >
      <AntHiveBtn
        :class="{ 'v-btn--active': currentLogTab == 'logs' }"
        @click="currentLogTab = 'logs'"
        class="mx-2"
        fill
        >Logs</AntHiveBtn
      >
    </div>
    <div>
      <v-card class="log-panel__tab-block" tile>
        <v-card-text>
          <pre class="log-panel__text"
            >{{ panelInfo[currentLogTab] }} {{ currentLogTab }}</pre
          >
        </v-card-text></v-card
      >
    </div>
  </div>
</template>



<script>
export default {
  name: 'GameLogPanel',
  data() {
    return {
      currentLogTab: 'request',
      panelInfo: {
        request: 'Requests go here...',
        response: 'Response go here...',
        logs: 'Logs go here...'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.log-panel {
  &__tab-block {
    height: 423px;
    overflow: auto;
    color: black !important;
  }
}
</style>
