<template>
  <section class="divider texture-scrabble">
    <v-parallax :src="require('@/assets/img/pre-footer.jpg')" height="300" />
  </section>
</template>

<script>
export default {
  data: () => ({}),
  mounted() {},
  components: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.divider {
  clip-path: polygon(0% 0%, 100% 3.49vw, 100% 100%, 0% 100%);
  height: 300px;
  background: white;
  margin-top: -50px;
}
</style>
