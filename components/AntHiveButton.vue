<template>
  <v-btn
    :tile="tile"
    :large="large"
    :color="color"
    :to="to"
    :disabled="disabled"
    :dark="!light"
    class="anthive-btn"
    fill
    @click="$emit('click')">
    <span class="text"><slot/></span>
  </v-btn>
</template>

<script>
export default {
  name: 'AntHiveButton',
  props: {
    light: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    tile: { type: Boolean, default: false },
    color: { type: String, default: '' },
    to: { type: String, default: '' }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.anthive-btn {
  min-height: 40px;
  box-shadow: none;
  .text {
    line-height: 1;
    font-weight: 600;
    text-transform: none;
  }
}
</style>
