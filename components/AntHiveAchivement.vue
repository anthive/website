<template>
 <div class="chip">
   <div class="icon">
     <v-img class="icon-img" src="/img/achiv.svg" />
     <div class="icon-text">Win game</div>
   </div>
   <div class="text">
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

  .icon {
    width: 85px;
    height: 85px;
    box-shadow: $box-shadow-default;
    background-color: $color-white;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .icon-img {
    max-width: 54px;
    max-height: 37px;
    margin: 15px auto 10px;
  }

  .icon-text {
    color: $color-white;
    font-size: $font-smaller;
    text-align: center;
    font-weight: 600;
    padding: 4px 0;
    background-color: $color-violet-650;
  }

  .text {
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
