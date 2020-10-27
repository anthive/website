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
<style>
.v-ripple__container {
  display: none !important;
}
</style>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.anthive-btn {
  min-height: 40px;
  box-shadow: none;
  &__text {
    line-height: 1;
    font-weight: 600;
    font-size: 14px;
    text-transform: capitalize;
  }
  &.v-btn--active {
    margin-bottom: -2px;
    border-bottom: 2px solid;
  }
  &.v-btn--active:before {
    display: none !important;
    background: none;
  }
  & .v-ripple__container {
    display: none !important;
  }
}
</style>
