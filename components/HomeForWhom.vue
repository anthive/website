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
        <v-img class="for-whom__img for-developers" src="/img/for-developers.svg" />
        <div class="for-whom__text">
          <h4 class="for-whom__title">{{ $t("home.forWhomDevelopersTitle") }}</h4>
          <p>{{ $t("home.forWhomDevelopersDescription") }}</p>
        </div>
      </div>
      <div class="for-whom__section">
        <v-img class="for-whom__img for-company" src="/img/for-company.svg" />
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
  background-color: $white;
  padding: 70px 0 20px;

  &__container {
    position: relative;
    max-width: 1160px;
  }

  &__section {
    display: flex;
    height: 180px;
    margin: 44px 0;

    &:nth-child(2n) {
      margin-left: 128px;
    }
    &:nth-child(3n) {
      margin-top: 70px;
      margin-left: 256px;
    }
  }

  &__img {
    z-index: 1;
    max-width: 120px;
    height: 155px;
    &.for-developers {
      height: 162px;
    }
    &.for-company {
      height: 144px;
    }
  }

  &__text {
    margin-left: 60px;
    max-width: 700px;
  }

  &__title {
    font-weight: 600;
    font-size: 22px;
    color: $violet;
    margin-bottom: 10px;
  }

  .bg-ornament {
    position: absolute;
    width: 535px;
    left: -188px;
    height: 640px;
    top: 209px;
    background: url(/img/bg-ornament.svg);
    transform: scaleX(-1);
  }

  @media screen and (max-width: $screen-md) {
    &__section {
      height: auto;
      margin: 44px 0 !important;
    }

    &__text {
      margin-left: 20px;
    }

    &__img {
      max-width: 80px;
      height: 104px;
      &.for-developers {
        height: 109px;
      }
      &.for-company {
        height: 96px;
      }
    }

    .bg-ornament {
      top: 10px;
      left: -370px;
    }
  }
}
</style>
