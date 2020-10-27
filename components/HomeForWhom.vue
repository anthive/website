<template>
  <section class="for-whom">
    <v-container class="for-whom__container">
      <div class="for-whom__section">
        <v-img class="for-whom__img" src="/img/for-begginers.svg" />
        <div class="for-whom__text">
          <h4 class="for-whom__title">{{ $t("home.forWhomBegginerTitle") }}</h4>
          <p>{{ $t("home.forWhomBegginerDescription") }}</p>
        </div>
      </div>
      <div class="for-whom__section">
        <v-img class="for-whom__img" src="/img/for-developers.svg" />
        <div class="for-whom__text">
          <h4 class="for-whom__title">{{ $t("home.forWhomDevelopersTitle") }}</h4>
          <p>{{ $t("home.forWhomDevelopersDescription") }}</p>
        </div>
      </div>
      <div class="for-whom__section">
        <v-img class="for-whom__img" src="/img/for-company.svg" />
        <div class="for-whom__text">
          <h4 class="for-whom__title">{{ $t("home.forWhomCompanyTitle") }}</h4>
          <p>{{ $t("home.forWhomCompanyDescription") }}</p>
        </div>
      </div>
      <div class="bg-ornament" />
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'HomeForWhom',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.for-whom {
  background-color: $color-violet-50;
  padding: 70px 0 20px;

  &__container {
    position: relative;
    max-width: 1160px;
  }

  &__section {
    display: flex;
    margin: 34px 0;

    &:nth-child(2n) {
      margin-left: 128px;
    }
    &:nth-child(3n) {
      margin-left: 256px;
    }
  }

  &__img {
    z-index: 1;
    max-width: 120px;
    height: 155px;
  }

  &__text {
    margin-left: 60px;
    max-width: 700px;
  }

  &__title {
    font-weight: 600;
    font-size: 22px;
    color: $color-violet-700;
    margin-bottom: 10px;
  }

  .bg-ornament {
    position: absolute;
    width: 535px;
    left: -188px;
    height: 640px;
    top: 180px;
    background: url(/img/bg-ornament.svg);
    transform: scaleX(-1);
  }
}
</style>
