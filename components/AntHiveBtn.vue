<template lang="pug">
	//- .wrapper-btn
	v-btn.btn.f-rubik.font-weight-medium( 
		v-bind="$attrs" 
		rounded :color="fill && 'accent'" 
		:fill="fill" 
		:class="{'white--text': fill, 'primary--text': !fill }" 
		:text="!fill")
		slot
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
