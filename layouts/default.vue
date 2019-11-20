<template lang="pug">
    v-app(id="inspire")
      defaultHeader
      v-content
        nuxt
      defaultFooter
</template>

<script>
import defaultHeader from '@/layouts/defaultHeader';
import defaultFooter from '@/layouts/defaultFooter';

export default {
	components: {
		defaultHeader,
		defaultFooter
	},
	data() {
		return {
		}
	},
	methods: {
	},
}
</script>

<style>
</style>
