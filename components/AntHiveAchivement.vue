<template>
 <div class="chip">
   <div class="chip__icon">
     <v-img class="chip__icon-img" src="/img/achiv.svg" />
     <div class="chip__icon-text">Win game</div>
   </div>
   <div class="chip__text">
    <p><strong>{{ title }}</strong></p>
    <p>{{ description }}</p>
   </div>
 </div>
</template>


<script>
export default {
  name: 'AntHiveAchivement',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.chip {
  display: flex;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: $color-violet-400;
  }

  &__icon {
    width: 85px;
    height: 85px;
    box-shadow: $box-shadow-default;
    background-color: $color-white;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__icon-img {
    max-width: 54px;
    max-height: 37px;
    margin: 15px auto 10px;
  }

  &__icon-text {
    color: $color-white;
    font-size: $font-smaller;
    text-align: center;
    font-weight: 600;
    padding: 4px 0;
    background-color: $color-violet-650;
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 35px;
    p {
      margin-bottom: 3px;
    }
  }
}
</style>
