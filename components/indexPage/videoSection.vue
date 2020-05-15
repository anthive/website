<template>
<section class="video_bg my-12">
  <div class="f-rubik f-title primary--text text-center">{{ $t('sectionTitle') }}</div>
  <v-row class="video_filter align-center justify-space-around">
    <v-col cols="11" lg="3">
      <v-card class="video-preview transparent" @click="dialog = !dialog" style="cursor: pointer;">
        <v-img src="/img/play_button.png" style="margin: 0 auto; filter: invert(1);" aspect-ratio="1" max-width="128px" contain=""></v-img>
      </v-card>
      <div class="text-xs-center">
        <v-dialog v-model="dialog" width="47%">
          <v-card>
            <iframe v-if="dialog" width="100%" height="500" src="https://www.youtube.com/embed/RP8t8O-O2gY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </v-card>
        </v-dialog>
      </div>
    </v-col>
    <v-col cols="11" lg="6">
      <v-card class="pa-3 transparent" flat>
        <v-card-title>
          <div class="f-rubik f-text-large primary--text">{{ $t('videoTitle') }}</div>
        </v-card-title>
        <v-card-text class="f-rubik f-text primary--text">
          <p>{{ $t('videoText1') }}</p>
          <p>{{ $t('videoText2') }}</p>
          <p>{{ $t('videoText3') }}</p>
        </v-card-text>
        <AntHiveBtn fill class="ma-3" :to="localePath('rules')" color="brown white--text">{{ $t('rules') }}</AntHiveBtn>
      </v-card>
    </v-col>
  </v-row>
  <hr class="video-preview__line">
</section>
</template>


<script>
export default {
  data: () => ({
    dialog: false
  }),
  mounted() {},
  components: {}
}
</script>

<style lang="scss" scoped>
.video-preview {
  background-image: url(/img/video-preview.jpg);
  background-position: center center;
  padding: 100px 0;
  &__line {
    transition: transform 0.2s ease-out;
    will-change: transform;
    transform: rotate(2deg);
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    height: 1px;
    position: relative;
    border: 0;
  }
  &__line::before,
  &__line::after {
    display: block;
    content: '';
    position: absolute;
    width: 50%;
    border-top: 1px solid #ececf1;
    -webkit-transition: -webkit-transform 0.2s ease-out;
    -webkit-transition: transform 0.2s ease-out;
    transition: transform 0.2s ease-out;
    will-change: transform;
  }
  &__line::before {
    transform: translateY(-5px);
    left: 0;
  }
  &__line::after {
    transform: translateY(5px);
    right: 0;
  }
}

.video_filter {
  min-height: 400px;
  height: 100%;
  width: 100%;
  background: rgba(250, 250, 250, 0.95);
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(250, 250, 250, 0.95) 0%,
    rgba(250, 250, 250, 1) 53%,
    rgba(250, 250, 250, 1) 100%
  );
  background: -webkit-gradient(
    radial,
    center center,
    0px,
    center center,
    100%,
    color-stop(0%, rgba(250, 250, 250, 0.95)),
    color-stop(53%, rgba(250, 250, 250, 1)),
    color-stop(100%, rgba(250, 250, 250, 1))
  );
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(250, 250, 250, 0.95) 0%,
    rgba(250, 250, 250, 1) 53%,
    rgba(250, 250, 250, 1) 100%
  );
  background: -o-radial-gradient(
    center,
    ellipse cover,
    rgba(250, 250, 250, 0.95) 0%,
    rgba(250, 250, 250, 1) 53%,
    rgba(250, 250, 250, 1) 100%
  );
  background: -ms-radial-gradient(
    center,
    ellipse cover,
    #fff351f2 0%,
    rgba(250, 250, 250, 1) 53%,
    rgba(250, 250, 250, 1) 100%
  );
  background: radial-gradient(
    ellipse at center,
    rgba(250, 250, 250, 0.95) 0%,
    rgba(250, 250, 250, 1) 53%,
    rgba(250, 250, 250, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fafafa', endColorstr='#fafafa', GradientType=1 );
}
</style>
