<template>
  <v-btn class="anthive-btn" @click="$emit('click')" v-bind="$attrs" fill :dark="!light">
    <span class="anthive-btn__text"><slot/></span>
  </v-btn>
</template>

<script>
export default {
  name: 'AntHiveBtn',
  props: {
    light: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.anthive-btn {
  border-radius: $border-radius-default !important;
  min-height: 40px;
  &__text {
    line-height: 1;
    font-weight: 600 !important;
    font-size: 14px;
    text-transform: uppercase;
  }
  &.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px;
    border-width: 1px;
    border-style: solid;
    border-color: $color-red-500 !important;
  }
}
</style>
