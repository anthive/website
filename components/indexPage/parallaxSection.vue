<template lang="pug">
    section
        v-parallax(src="/img/home_bg.png" height="700")
            v-container
                v-row.justify-center.align-start
                    v-col.mb-4.text-center(cols= "12" md="6")
                        div.white--text.mb-5.mt-0.display-2.font-weight-thin {{ $t('slogan1') }}
                        div.headline.font-weight-bold.orange--text.text--darken-1 {{ $t('slogan2') }}
                        div.hidden-sm-and-down.mt-2.title.font-weight-regular {{ $t('slogan3') }}
                    v-col.d-flex.justify-center(md="6")
                        div.ant-player( @click="playPausePlayer()" id="player" )
                            h2.loading {{ $t('loading') }}
</template>

<script>
let homepagePlayer = null;

export default {
  data: () => ({
    isPlaying: true,
  }),
  mounted() {
    const dataUrl = 'https://storage.googleapis.com/anthive-dev-games/Kj5A2SydOFlqgLIu35Br.zip';
    // const dataUrl = 'https://storage.googleapis.com/anthive-dev-games/LyJ6Lfq3FG8sbE0KO3bp.zip'
    homepagePlayer = new AnthivePlayer(dataUrl, '#player');
  },
  methods: {
    playPausePlayer() {
      if (this.isPlaying){
        homepagePlayer.pause();
        this.isPlaying = false;
      }else {
        homepagePlayer.play();
        this.isPlaying = true;
      }
    },
  }
}
</script>

<style scoped>
    .ant-player {
        background-image: url('https://anthive.io/skins/server/1/background.png');
    }
</style>>
