<template>
  <v-btn
    @click="$emit('click')"
    class="btn f-rubik font-weight-medium"
    v-bind="$attrs"
    rounded
    :color="primary ? 'primary' : 'accent'"
    :fill="fill"
    :class="{'white--text': fill, 'primary--text': !fill &amp; !primary,  }"
    :text="!fill"
  >
    <slot></slot>
  </v-btn>
</template>


<script>
export default {
  name: 'AntHiveBtn',
  props: {
    fill: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  methods: {}
}
</script>

<style scoped>
.btn {
  letter-spacing: 0.2px !important;
}
.white--text:hover {
  background-color: rgb(255, 0, 0);
}
</style>
