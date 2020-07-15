<template>
  <section class="video-bg">
    <div class="f-rubik f-subtitle primary--text text-center">{{ $t('home.sectionTitle') }}</div>
    <v-row class="video-filter align-center justify-center">
      <v-col cols="12" lg="5">
        <v-card class="video-preview transparent" @click="dialog = !dialog">
          <v-img src="/img/play_button.png" style="margin: 0 auto; filter: invert(1);" aspect-ratio="1" max-width="128px" contain="" />
        </v-card>
        <div class="text-xs-center">
          <v-dialog v-model="dialog" width="47%">
            <v-card>
              <iframe v-if="dialog" width="100%" height="500" src="https://www.youtube.com/embed/RP8t8O-O2gY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
      <v-col cols="12" lg="5">
        <v-card class="pa-3 transparent" flat>
          <v-card-title>
            <div class="f-rubik f-text-large primary--text">{{ $t("home.videoTitle") }}</div>
          </v-card-title>
          <v-card-text class="f-rubik f-text primary--text">
            <p>{{ $t("home.videoText1") }}</p>
            <p>{{ $t("home.videoText2") }}</p>
            <p>{{ $t("home.videoText3") }}</p>
          </v-card-text>
          <AntHiveBtn class="ma-3" :to="localePath('rules')" color="accent">{{ $t('header.rules') }}</AntHiveBtn>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.video-bg {
  clip-path: polygon(0% 0%, 100% 3.49vw, 100% 100%, 0% 100%);
  background-color: $color-white;
  padding: 120px 0;
  margin-top: -120px;
}

.video-preview {
  background-image: url(/img/video-preview.jpg);
  background-position: center center;
  background-size: cover;
  padding: 100px 0;
  cursor: pointer;
  box-shadow: $box-shadow-default;
}

.video-filter {
  min-height: 400px;
  height: 100%;
  width: 100%;
  background: $color-white;
}
</style>
