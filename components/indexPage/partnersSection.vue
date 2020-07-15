<template>
  <section class="partners texture-scrabble">
    <div
      class="partners__row d-flex align-center"
      :class="
        $vuetify.breakpoint.xsOnly
          ? 'justify-space-evenly'
          : 'justify-space-around'
      "
    >
      <img
        :height="$vuetify.breakpoint.smAndDown ? 20 : 40"
        src="/partners/git.png"
        alt="git"
      /><img
        :height="$vuetify.breakpoint.smAndDown ? 20 : 40"
        src="/partners/autodesc.png"
        alt="autodesc"
      />
      <img
        :height="$vuetify.breakpoint.smAndDown ? 20 : 40"
        src="/partners/pp.png"
        alt="pp"
      />
      <img
        :height="$vuetify.breakpoint.smAndDown ? 20 : 40"
        src="/partners/nytimes.png"
        alt="nytimes"
      />
    </div>
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
.justify-space-evenly {
  justify-content: space-evenly !important;
}
.partners {
  clip-path: polygon(0% 0%, 100% 3.49vw, 100% 100%, 0% 100%);
  &__row {
    height: 300px;
    @media only screen and (max-width: 600px) {
      flex-direction: column;
      height: 450px;
    }
  }
}
</style>
