<template>
  <span @click="$emit('click')" class="anthive-icon" :class="{small, medium, big}" :style="getIconStyles" />
</template>

<script>
export default {
  name: 'AntHiveIcon',
  props: {
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    medium: {
      type: Boolean,
      required: false,
      default: false
    },
    big: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      required: false,
      default: 'black'
    },
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    getIconStyles() {
      return `
        background-color: ${this.color};
        -webkit-mask: url(/img/${this.icon}.svg) no-repeat center;
        mask: url(/img/${this.icon}.svg) no-repeat center;
        mask-size: cover;
      `
    }
  }
}
</script>

<style lang="scss" scoped>
.anthive-icon {
  display: inline-block;
  width: 22px;
  height: 22px;
}
.small {
  width: 16px;
  height: 16px;
}
.medium {
  width: 24px;
  height: 24px;
}
.big {
  width: 40px;
  height: 40px;
}
</style>
